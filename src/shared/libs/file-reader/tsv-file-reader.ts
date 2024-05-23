import {FileReader} from './file-reader.interface';
import {createReadStream} from 'node:fs';
import EventEmitter from 'node:events';

const CHUNK_SIZE = 65536;

export class TsvFileReader extends EventEmitter implements FileReader {
  constructor(
    private readonly fileName: string
  ) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.fileName, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8'
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
