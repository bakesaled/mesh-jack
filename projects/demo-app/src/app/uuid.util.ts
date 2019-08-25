export class UuidUtil {
  private static ids: Set<string> = new Set<string>();

  public static new() {
    // Not really uu Ids
    let id: string;
    do {
      id = UuidUtil.generateId();
    } while (UuidUtil.ids.has(id));
    UuidUtil.ids.add(id);
    return id;
  }

  public static clear() {
    UuidUtil.ids.clear();
  }

  private static generateId(): string {
    return `${UuidUtil.getRandomLetter()}${UuidUtil.getRndInteger(0, 9)}`;
  }

  private static getRandomLetter() {
    const asciiCode = UuidUtil.getRndInteger(65, 90);
    return String.fromCharCode(asciiCode);
  }

  private static getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
