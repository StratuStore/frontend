import { test, expect } from "@playwright/experimental-ct-react"
import Button, { ButtonProps } from "@/ui/shared/Button"

const buttonVariants = ["primary", "ghost", "icon", "outline"] as const

const buttonSizes: ButtonProps["size"][] = ["default", "small"]

test.describe("Button component", () => {
    test("renders children", async ({ mount }) => {
        const component = await mount(<Button>Click me</Button>)
        await expect(component).toContainText("Click me")
    })

    test("calls onClick when clicked", async ({ mount }) => {
        let clicked = false
        const component = await mount(
            <Button onClick={() => (clicked = true)}>Click</Button>
        )
        await component.click()
        expect(clicked).toBe(true)
    })

    test("is disabled when disabled prop is true", async ({ mount }) => {
        const component = await mount(<Button disabled>Disabled</Button>)
        await expect(component).toBeDisabled()
    })

    test("is disabled when loading prop is true", async ({ mount }) => {
        const component = await mount(<Button loading>Loading</Button>)
        await expect(component).toBeDisabled()
    })

    test("shows spinner when loading", async ({ mount }) => {
        const component = await mount(<Button loading>Loading</Button>)
        await expect(component.locator("svg")).toBeVisible()
        await expect(component).toContainText("Loading")
    })

    test("hides children visually when loading", async ({ mount }) => {
        const component = await mount(<Button loading>Hidden</Button>)
        const hiddenContent = component.locator("span[class*=hiddenContent]")
        await expect(hiddenContent).toHaveCSS("visibility", "hidden")
    })

    for (const variant of buttonVariants) {
        test(`applies correct class for variant: ${variant}`, async ({
            mount,
        }) => {
            const component = await mount(
                <Button variant={variant}>Test</Button>
            )
            await expect(component).toHaveClass(new RegExp(variant))
        })
    }

    for (const size of buttonSizes) {
        test(`applies correct class for size: ${size}`, async ({ mount }) => {
            const component = await mount(<Button size={size}>Test</Button>)
            if (size === "small") {
                await expect(component).toHaveClass(/small/)
            } else {
                await expect(component).not.toHaveClass(/small/)
            }
        })
    }

    test("applies custom className", async ({ mount }) => {
        const component = await mount(
            <Button className="custom-class">Custom</Button>
        )
        await expect(component).toHaveClass(/custom-class/)
    })
})

