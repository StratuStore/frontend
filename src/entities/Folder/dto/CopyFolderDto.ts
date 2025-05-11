export class CopyFolderDto {
    constructor(
        public readonly id: string,
        public readonly destinationFolderId: string
    ) {}
}
