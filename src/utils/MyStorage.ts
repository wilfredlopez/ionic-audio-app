import { Plugins } from "@capacitor/core";
const { Storage: CapStorage } = Plugins;

interface Options {
  key: string;
  value: string;
}
export default class MyStorage {
  currentId: number = 0;

  // JSON "set" example
  async setObject(item: Options) {
    await CapStorage.set({
      key: item.key,
      value: JSON.stringify({
        id: this.currentId,
        value: item.value,
      }),
    });
    this.currentId++;
  }

  // JSON "get" example
  async getObject<T extends any>(item: { key: string }): Promise<T | null> {
    const ret = await CapStorage.get(item);
    const value = ret.value ? JSON.parse(ret.value) : null;
    return value ? JSON.parse(value.value) : null as T | null;
    //   const user = JSON.parse(ret.value);
  }

  async setItem(item: Options) {
    await CapStorage.set(item);
  }

  async getItem(key: string) {
    const { value } = await CapStorage.get({ key: key });
    // console.log("Got item: ", value);
    return value;
  }

  async removeItem(key: string) {
    await CapStorage.remove({ key: key });
  }

  async keys() {
    const { keys } = await CapStorage.keys();

    // console.log("Got keys: ", keys);
    return keys;
  }

  async clear() {
    await CapStorage.clear();
  }
}

export const Storage = new MyStorage();
