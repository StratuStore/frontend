import { forwardRef, useState, useRef, KeyboardEvent } from "react"
import clsx from "clsx"
import Input, { InputProps } from "@/ui/shared/Input"
import styles from "./styles.module.scss"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import Button from "@/ui/shared/Button"

export type TagsInputProps = Omit<InputProps, "value" | "onChange"> & {
    onChange: (value: string[]) => void
    onBlur?: () => void
    value: string[]
    name?: string
    tagClasses?: string
    tagsContainerClasses?: string
    allowDuplicates?: boolean
    delimiters?: string[]
    inputPlaceholder?: string
}

const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
    (
        {
            onChange,
            onBlur,
            value: tags,
            name,
            tagClasses,
            tagsContainerClasses,
            allowDuplicates = false,
            delimiters = [",", "Enter"],
            inputPlaceholder = "Add a tag...",
            ...props
        },
        ref
    ) => {
        const [inputValue, setInputValue] = useState("")
        const inputRef = useRef<HTMLInputElement>(null)

        const addTag = (tag: string) => {
            const trimmedTag = tag.trim()
            if (!trimmedTag) return

            if (!allowDuplicates && tags.includes(trimmedTag)) {
                return
            }

            const newTags = [...tags, trimmedTag]
            setInputValue("")
            onChange(newTags)
        }

        const removeTag = (index: number) => {
            const newTags = tags.filter((_, i) => i !== index)
            onChange(newTags)
        }

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)
        }

        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            const key = e.key

            if (delimiters.includes(key)) {
                e.preventDefault()
                addTag(inputValue)
            }

            if (key === "Backspace" && !inputValue && tags.length > 0) {
                const newTags = [...tags]
                newTags.pop()
                onChange(newTags)
            }
        }

        const handleFocus = () => {
            inputRef.current?.focus()
        }

        return (
            <div className={styles.tagsInputContainer}>
                <Input
                    {...props}
                    ref={(e) => {
                        if (typeof ref === "function") {
                            ref(e)
                        } else if (ref) {
                            ref.current = e
                        }
                    }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onBlur={onBlur}
                    name={name}
                    placeholder={inputPlaceholder}
                />
                {tags.length > 0 && (
                    <div
                        className={clsx(
                            styles.tagsContainer,
                            tagsContainerClasses
                        )}
                        onClick={handleFocus}
                    >
                        {tags.map((tag, index) => (
                            <div
                                key={`${tag}-${index}`}
                                className={clsx(styles.tag, tagClasses)}
                            >
                                <span className={styles.tagText}>{tag}</span>
                                <Button
                                    type="button"
                                    variant="icon"
                                    className={styles.tagRemove}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeTag(index)
                                    }}
                                    aria-label={`Remove tag ${tag}`}
                                >
                                    <Icon name={IconName.WindowClose} />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }
)

TagsInput.displayName = "TagsInput"

export default TagsInput

