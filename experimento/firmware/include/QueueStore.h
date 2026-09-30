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

  bool peek(String& path, String& record) const {
    File directory = LittleFS.open(kDirectory);
    if (!directory || !directory.isDirectory()) {
      return false;
    }

    String firstPath;
    File entry = directory.openNextFile();
    while (entry) {
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

  bool remove(const String& path) const { return LittleFS.remove(path); }

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
    File entry = directory.openNextFile();
    while (entry) {
      if (!entry.isDirectory() && String(entry.name()).endsWith(".json")) {
        ++count;
      }
      entry.close();
      entry = directory.openNextFile();
    }
    directory.close();
    return count;
  }

  mutable Preferences preferences_;
  uint32_t nextId_ = 1;
  uint32_t droppedTotal_ = 0;
};
