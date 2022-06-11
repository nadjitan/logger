import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react"

interface IDraggableProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode | undefined
  boundToParent?: boolean
}

/**
 * @props boundToParent - If true, the draggable will be bound to the parent element.
 * @props ref - If present will be used as drag handle else use whole div when activating.
 */
export default forwardRef<HTMLElement, IDraggableProps>((props, ref) => {
  const dragHandleRef = ref as React.RefObject<HTMLElement>
  const innerRef = useRef<HTMLDivElement>(null)
  const divRef = innerRef.current!
  const dragProps = useRef<{
    /**
     * Default top value
     */
    origTop: number
    /**
     * Default left value
     */
    origLeft: number
    dragStartLeft: number
    dragStartTop: number
    mouseDownX: number
    mouseDownY: number
  }>()

  /**
   * @source Inspired by: https://stackoverflow.com/a/54078570 &
   * https://javascript.info/mouse-drag-and-drop
   *
   */
  const initialiseDrag = (event: React.MouseEvent | MouseEvent) => {
    const { left, top } = divRef.getBoundingClientRect()

    dragProps.current = {
      origTop: parseInt(getComputedStyle(divRef).top),
      origLeft: parseInt(getComputedStyle(divRef).left),
      dragStartLeft: left - divRef.offsetLeft,
      dragStartTop: top - divRef.offsetTop,
      mouseDownX: event.clientX,
      mouseDownY: event.clientY,
    }
    window.addEventListener("mousemove", startDragging)
    window.addEventListener("mouseup", stopDragging)
  }

  const startDragging = ({ clientX, clientY }: MouseEvent) => {
    const currDP = dragProps.current!

    let x = currDP.dragStartLeft + clientX - currDP.mouseDownX
    let y = currDP.dragStartTop + clientY - currDP.mouseDownY

    if (props.boundToParent) {
      const { offsetWidth, offsetHeight, parentElement } = divRef
      // Prevent going past right & bottom of parent
      const rEdge = parentElement!.offsetWidth - offsetWidth
      const bEdge = parentElement!.offsetHeight - offsetHeight

      if (x < 0) x = 0
      if (y < 0) y = 0
      if (x > rEdge) x = rEdge + currDP.origLeft
      if (y > bEdge) y = bEdge + currDP.origTop
    }

    divRef.style.transform = `translate(${x}px, ${y}px)`
  }

  const stopDragging = () => {
    window.removeEventListener("mousemove", startDragging)
    window.removeEventListener("mouseup", stopDragging)
  }

  // useImperativeHandle(ref, () => dragHandleRef.current!)

  useLayoutEffect(() => {
    if (dragHandleRef !== null) {
      if (dragHandleRef.current !== null)
        dragHandleRef.current!.addEventListener("mousedown", initialiseDrag)
    }
  })

  return (
    <div
      {...props}
      ref={innerRef}
      onMouseDown={!ref ? initialiseDrag : () => {}}
      style={{ ...props.style, position: "fixed" }}
    >
      {props.children}
    </div>
  )
})
