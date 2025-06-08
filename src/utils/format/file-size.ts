type FormatFileSizeOptions = {
    decimals?: number
    binary?: boolean
    spacer?: string
    showZeroDecimals?: boolean
}

export function formatFileSize(
    bytes: number,
    options: FormatFileSizeOptions = {}
): string {
    const {
        decimals = 1,
        binary = false,
        spacer = " ",
        showZeroDecimals = false,
    } = options

    if (bytes === 0) return `0${spacer}B`
    if (bytes < 0) return "Invalid size"
    if (typeof bytes !== "number" || !isFinite(bytes)) return "Invalid size"

    const base = binary ? 1024 : 1000
    const units = binary
        ? ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
        : ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const unitIndex = Math.floor(Math.log(bytes) / Math.log(base))
    const clampedIndex = Math.min(unitIndex, units.length - 1)
    const size = bytes / Math.pow(base, clampedIndex)

    let formattedSize
    if (clampedIndex === 0) {
        formattedSize = size.toString()
    } else {
        formattedSize = size.toFixed(decimals)

        if (!showZeroDecimals) {
            formattedSize = parseFloat(formattedSize).toString()
        }
    }

    return `${formattedSize}${spacer}${units[clampedIndex]}`
}

