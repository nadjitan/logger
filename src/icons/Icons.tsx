import React, { FC } from "react"

interface IconProps {
  style?: React.CSSProperties
  stroke?: React.CSSProperties["stroke"]
  fill?: React.CSSProperties["fill"]
  title?: string
  scale?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1
  onClick?: () => void
}

const svgDefaults = (props: IconProps): React.CSSProperties => {
  let styles = {
    ...props.style,
    cursor: "pointer",
    zIndex: 110,
  }
  if (props.scale) return { ...styles, transform: `scale(${props.scale})` }
  else return styles
}
const spanDefaults = (): React.CSSProperties => ({
  display: "inline-flex",
})

export const ChevronDownIcon: FC<IconProps> = props => (
  <span title={props.title} style={spanDefaults()}>
    <svg
      onClick={props.onClick}
      style={svgDefaults(props)}
      stroke={props.stroke}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
        fill={props.fill || "white"}
      />
    </svg>
  </span>
)

// export const FilterIcon: FC<IconProps & { title: string }> = ({
export const FilterIcon: FC<IconProps> = props => (
  <span title={props.title} style={spanDefaults()}>
    <svg
      onClick={props.onClick}
      style={svgDefaults(props)}
      stroke={props.stroke || "white"}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke-width="2"
    >
      <path
        fill={props.fill || "white"}
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  </span>
)

export const ClearIcon: FC<IconProps> = props => (
  <span title={props.title} style={spanDefaults()}>
    <svg
      onClick={props.onClick}
      style={svgDefaults(props)}
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
    >
      <path
        fill={props.fill || "white"}
        d="M19 14.586l3.586-3.586 1.414 1.414-3.586 3.586 3.586 3.586-1.414 1.414-3.586-3.586-3.586 3.586-1.414-1.414 3.586-3.586-3.586-3.586 1.414-1.414 3.586 3.586zm-7 6.414h-12v-2h12v2zm0-4.024h-12v-2h12v2zm0-3.976h-12v-2h12v2zm12-4h-24v-2h24v2zm0-4h-24v-2h24v2z"
      />
    </svg>
  </span>
)

export const SearchIcon: FC<IconProps> = props => (
  <span title={props.title} style={spanDefaults()}>
    <svg
      onClick={props.onClick}
      style={svgDefaults(props)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={props.fill || "white"}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
      />
    </svg>
  </span>
)
