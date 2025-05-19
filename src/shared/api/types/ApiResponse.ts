export abstract class ApiResponse<T> {
    constructor(
        public readonly ok: boolean,
        public readonly body?: T,
        public readonly message?: string
    ) {}
}

