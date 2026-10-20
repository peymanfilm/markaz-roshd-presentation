"use client"

import React, {
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react"
import { AnimatePresence, motion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * فهرست متحرک — Magic UI
 *
 * هر آیتم با فاصلهٔ زمانی و با انیمیشن فنری ظاهر می‌شود.
 * برای اسلایدهای فهرست‌مانند (مانند ترکیب اعضای شورا) استفاده می‌شود.
 */
export function AnimatedListItem({
  children,
  transition,
}: {
  children: React.ReactNode
  transition?: MotionProps["transition"]
}) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: transition ?? { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
  /** اگر false باشد، آیتم‌ها با همان ترتیب داده نمایش داده می‌شوند (به‌جای معکوس) */
  reverse?: boolean
  /** تنظیم انیمیشن ورود آیتم‌ها — برای کندتر کردن ریتم ارائه */
  transition?: MotionProps["transition"]
}

export const AnimatedList = React.memo(
  ({
    children,
    className,
    delay = 1000,
    reverse = true,
    transition,
    ...props
  }: AnimatedListProps) => {
    const [index, setIndex] = useState(0)
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )

    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout> | null = null

      if (index < childrenArray.length - 1) {
        timeout = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)
        }, delay)
      }

      return () => {
        if (timeout !== null) {
          clearTimeout(timeout)
        }
      }
    }, [index, delay, childrenArray.length])

    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, index + 1)
      return reverse ? result.reverse() : result
    }, [index, childrenArray, reverse])

    return (
      <div
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem
              key={(item as React.ReactElement).key}
              transition={transition}
            >
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedList.displayName = "AnimatedList"
