export type FileUploadHandlers = {
    onProgress: (progress: number) => void
    onSuccess: () => void
    onError: (error: Error) => void
}

