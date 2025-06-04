export class CreateFileDto {
    constructor(
        public name: string,
        public parentDirId: string,
        public size: number,
        public extension: string
    ) {}
}
