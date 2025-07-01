export default class TestSequence {
  ctx;

  constructor(ctx: any) {
    this.ctx = ctx;
  }

  // async so it can be extended by other sequelizers
  async shard(files: any) {
    return files;
  }

  // async so it can be extended by other sequelizers
  async sort(files: any) {
    return files.sort((testA: any, testB: any) =>
      testA[1] > testB[1] ? 1 : -1
    );
  }
}
