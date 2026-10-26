#pragma once

#include <Arduino.h>
#include <FS.h>
#include <LittleFS.h>
#include <Preferences.h>

class QueueStore {
 public:
  static constexpr uint16_t kCapacity = 256;

  bool begin() {
    if (!LittleFS.begin(true)) {
      return false;
    }
    if (!LittleFS.exists(kDirectory) && !LittleFS.mkdir(kDirectory)) {
      return false;
    }
    preferences_.begin("tcc-node", false);
    nextId_ = preferences_.getULong("queue-next", 1);
    headId_ = preferences_.getULong("queue-head", 0);
    droppedTotal_ = preferences_.getULong("dropped", 0);
    return true;
  }

  uint16_t depth() const { return countFiles(); }
  uint32_t droppedTotal() const { return droppedTotal_; }

  bool enqueue(const String& record) {
    if (depth() >= kCapacity) {
      ++droppedTotal_;
      preferences_.putULong("dropped", droppedTotal_);
      return false;
    }

    return enqueueUnchecked(record);
  }

  // Uso restrito ao T010: o chamador já conhece e limita a ocupação local.
  // Evita revarrer todo o diretório LittleFS a cada inserção de estresse.
  bool enqueueUnchecked(const String& record) {

    const String path = filePath(nextId_++);
    const String temporaryPath = path + ".tmp";
    File file = LittleFS.open(temporaryPath, FILE_WRITE);
    if (!file) {
      return false;
    }
    const size_t written = file.print(record);
    file.close();
    if (written != record.length()) {
      LittleFS.remove(temporaryPath);
      return false;
    }
    if (!LittleFS.rename(temporaryPath, path)) {
      LittleFS.remove(temporaryPath);
      return false;
    }
    preferences_.putULong("queue-next", nextId_);
    return true;
  }

  bool peek(String& path, String& record) {
    if (headId_ != 0) {
      const String directPath = filePath(headId_);
      File directFile = LittleFS.open(directPath, FILE_READ);
      if (directFile) {
        record = directFile.readString();
        directFile.close();
        path = directPath;
        return !record.isEmpty();
      }
      // Uma lacuna não impede a recuperação: volta à descoberta ordenada.
      headId_ = 0;
      preferences_.putULong("queue-head", headId_);
    }

    File directory = LittleFS.open(kDirectory);
    if (!directory || !directory.isDirectory()) {
      return false;
    }

    String firstPath;
    uint16_t entriesVisited = 0;
    File entry = directory.openNextFile();
    while (entry && entriesVisited < kCapacity * 2) {
      ++entriesVisited;
      const String candidateName = entry.name();
      const String candidatePath = candidateName.startsWith("/")
          ? candidateName
          : String(kDirectory) + "/" + candidateName;
      if (!entry.isDirectory() && candidateName.endsWith(".json") &&
          (firstPath.isEmpty() || candidatePath < firstPath)) {
        firstPath = candidatePath;
      }
      entry.close();
      entry = directory.openNextFile();
    }
    directory.close();
    if (firstPath.isEmpty()) {
      return false;
    }

    File file = LittleFS.open(firstPath, FILE_READ);
    if (!file) {
      return false;
    }
    record = file.readString();
    file.close();
    path = firstPath;
    const int separator = firstPath.lastIndexOf('-');
    const int extension = firstPath.lastIndexOf('.');
    if (separator >= 0 && extension > separator) {
      headId_ = static_cast<uint32_t>(firstPath.substring(separator + 1, extension).toInt());
      preferences_.putULong("queue-head", headId_);
    }
    return !record.isEmpty();
  }

  bool replace(const String& path, const String& record) const {
    const String temporaryPath = path + ".tmp";
    File file = LittleFS.open(temporaryPath, FILE_WRITE);
    if (!file) {
      return false;
    }
    const size_t written = file.print(record);
    file.close();
    if (written != record.length()) {
      LittleFS.remove(temporaryPath);
      return false;
    }
    LittleFS.remove(path);
    if (!LittleFS.rename(temporaryPath, path)) {
      LittleFS.remove(temporaryPath);
      return false;
    }
    return true;
  }

  bool remove(const String& path) {
    const bool removed = LittleFS.remove(path);
    if (removed && headId_ != 0 && path == filePath(headId_)) {
      ++headId_;
      preferences_.putULong("queue-head", headId_);
    }
    return removed;
  }

  void clear() {
    File directory = LittleFS.open(kDirectory);
    if (directory) {
      File entry = directory.openNextFile();
      while (entry) {
        const String path = entry.path();
        entry.close();
        LittleFS.remove(path);
        entry = directory.openNextFile();
      }
      directory.close();
    }
    nextId_ = 1;
    headId_ = 0;
    droppedTotal_ = 0;
    preferences_.putULong("queue-next", nextId_);
    preferences_.putULong("queue-head", headId_);
    preferences_.putULong("dropped", droppedTotal_);
  }

 private:
  static constexpr const char* kDirectory = "/queue";

  String filePath(uint32_t id) const {
    char name[32];
    snprintf(name, sizeof(name), "%s/q-%010lu.json", kDirectory,
             static_cast<unsigned long>(id));
    return String(name);
  }

  uint16_t countFiles() const {
    File directory = LittleFS.open(kDirectory);
    if (!directory || !directory.isDirectory()) {
      return 0;
    }
    uint16_t count = 0;
    uint16_t entriesVisited = 0;
    File entry = directory.openNextFile();
    while (entry) {
      ++entriesVisited;
      if (!entry.isDirectory() && String(entry.name()).endsWith(".json")) {
        ++count;
      }
      entry.close();
      // A fila aceita no máximo 256 JSON. Parar aqui evita que uma listagem
      // corrompida ou arquivos temporários órfãos bloqueiem o loop principal.
      if (count >= kCapacity || entriesVisited >= kCapacity * 2) {
        directory.close();
        return kCapacity;
      }
      entry = directory.openNextFile();
    }
    directory.close();
    return count;
  }

  mutable Preferences preferences_;
  uint32_t nextId_ = 1;
  uint32_t headId_ = 0;
  uint32_t droppedTotal_ = 0;
};
