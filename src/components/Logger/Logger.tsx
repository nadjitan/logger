import React, { useRef, useState, useLayoutEffect } from "react"
import Draggable from "../../helpers/Draggable"
import { ChevronDownIcon, ClearIcon, FilterIcon } from "../../icons/Icons"

export interface LoggerProps {
  /**
   * Logger contents
   */
  data: any[]
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

export default ({ data, backgroundColor }: LoggerProps) => {
  const [currData, setData] = useState(data)
  const [filteredData, setFilteredData] = useState<{ [k: string]: number }>({})
  const [isOpen, setIsOpen] = useState(true)
  const [isHover, setIsHover] = useState(false)
  const [isGrouped, setIsGrouped] = useState(true)
  const debugElemIdsRef = useRef<HTMLDivElement | null>(null)
  const dragHandleRef = useRef<HTMLElement | null>(null)

  const clickEvent = (e: MouseEvent | FocusEvent) => {
    const target = e.target as HTMLElement
    setData([...currData, target.tagName])
    setFilteredData(
      currData.reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {})
    )
    e.stopPropagation()
  }

  useLayoutEffect(() => {
    if (!isHover) {
      if (debugElemIdsRef.current!.lastElementChild) {
        debugElemIdsRef.current!.lastElementChild.scrollIntoView({
          behavior: "smooth",
        })
      }

      document.body.addEventListener("click", clickEvent)
      document.body.addEventListener("focus", clickEvent)

      return () => {
        document.body.removeEventListener("click", clickEvent)
        document.body.removeEventListener("focus", clickEvent)
      }
    }
  })

  return (
    <Draggable
      boundToParent={true}
      onMouseEnter={() => setIsHover(!isHover)}
      onMouseLeave={() => setIsHover(!isHover)}
      ref={dragHandleRef}
      style={{
        userSelect: isHover ? "all" : "none",
        backgroundColor: backgroundColor || "rgba(0, 0, 0, 0.6)",
        opacity: isHover ? 1 : 0.7,
        display: "grid",
        gridTemplateRows: isOpen ? "auto 1fr" : "1fr",
        justifyItems: "center",
        top: 10,
        left: 10,
        font: "12px monospace",
        borderRadius: isOpen ? 10 : "50%",
        width: isOpen ? "220px" : "40px",
        height: isOpen ? "220px" : "40px",
        color: "white",
        zIndex: 100,
        transition: "all 0.3s ease, transform 0ms",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          justifyContent: isOpen ? "space-between" : "center",
          alignItems: "center",
          boxSizing: "border-box",
          padding: isOpen ? "10px 10px 0px 10px" : "0px",
          width: "100%",
        }}
      >
        {isOpen && (
          <b ref={dragHandleRef} style={{ userSelect: "none", cursor: "move" }}>
            LOG
          </b>
        )}
        <div>
          {isOpen && (
            <>
              <ClearIcon
                scale={0.7}
                title="Clear"
                onClick={() => {
                  setData([])
                  setFilteredData({})
                }}
              />
              <FilterIcon
                scale={0.7}
                title={isGrouped ? "Ungroup" : "Group"}
                fill={isGrouped ? "white" : "none"}
                onClick={() => setIsGrouped(!isGrouped)}
              />
            </>
          )}
          <ChevronDownIcon
            title={isOpen ? "Close" : "Open"}
            onClick={() => setIsOpen(!isOpen)}
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "all 0.2s ease-in-out",
            }}
          />
        </div>
      </div>
      <div
        ref={debugElemIdsRef}
        style={{
          boxSizing: "border-box",
          padding: "0px 10px 10px 10px",
          width: "100%",
          position: "relative",
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {isGrouped
          ? Object.entries(filteredData).map(([key, value], index) => (
              <span key={index}>{value > 1 ? value + " | " + key : key}</span>
            ))
          : currData.map((data, index) => <span key={index}>{data}</span>)}
      </div>
    </Draggable>
  )
}
