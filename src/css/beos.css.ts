import { FONT_COURIER_10_PITCH } from "@/fonts";
import { THEME_BEOS } from "@/themes";
import { createGlobalTheme } from "@vanilla-extract/css";
import { vars } from "./vars.css";

const borderWidth = "0.0625rem";
const colorHighlight = "rgba(255, 255, 255, 0.6)";
const colorLowlight = "rgba(0, 0, 0, 0.2)";
const textColorLight = "rgb(255, 255, 255)";

export default createGlobalTheme(`.${THEME_BEOS.id}`, vars, {
  background: {
    color: {
      dark: "rgb(184, 184, 184)",
      default: "rgb(222, 222, 222)",
      inactive: "rgb(232, 232, 232)",
      selection: "rgb(0, 0, 0)",
    },
  },
  border: {
    color: {
      dark: "rgb(96, 96, 96)",
      light: "rgb(153, 153, 153)",
    },
    radius: "0",
    width: borderWidth,
  },
  box: {
    shadow: {
      high: [
        `inset ${borderWidth} ${borderWidth} ${colorHighlight}`,
        `inset calc(${borderWidth} * -1) calc(${borderWidth} * -1) ${colorLowlight}`,
      ].join(),
      low: [
        `inset ${borderWidth} ${borderWidth} ${colorLowlight}`,
        `inset calc(${borderWidth} * -1) calc(${borderWidth} * -1) ${colorHighlight}`,
      ].join(),
    },
  },
  color: {
    highlight: colorHighlight,
    lowlight: colorLowlight,
  },
  components: {
    systemBar: {
      height: "auto",
      width: "11rem",
    },
    window: {
      header: {
        height: "1.125rem",
      },
      padding: "0.25rem",
    },
  },
  cursor: {
    default: [
      "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3ZnIGhlaWdodD0iMzIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDY0IDY0IiB3aWR0aD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8cGF0aCBkPSJNMzIgMjhDMzIgMjggMzIgMTkuMyAzMiAxN0MzMiAxNS4xNyAyOC45MSAxMS45IDI4IDEyQzI2LjQgMTIuMTYgMjkuNjkgMTUuNTMgMjguNTMgMTUuNTNDMjcuMzggMTUuNTMgMjUuMDUgMTAgMjIuNzUgMTBDMjAuNDQgMTAgMjMuOTIgMTQuMzggMjIuNzYgMTQuMzhDMjEuNjEgMTQuMzggMTguMyAxMCAxNiAxMEMxNCAxMCAxOC4xNSAxNSAxNyAxNUMxNi4zOCAxNSAxMy41NSAxMy45NCAxMS4yNCAxMC42QzkuNjIgOC4yNSA3LjM3IDQgNC44MyA0QzIuMzcgNCA1LjU0IDguOTIgNy4wOCAxMS40NkM4LjYyIDE0IDE1IDI0IDE1IDI0QzE1IDI0IDcuMyAyMCA1IDIwQzMuODQgMjAgMiAyMC40NCAyIDIxLjU5QzIgMjMgNCAyMi44OCA1LjQ2IDIzLjYxQzcuNzYgMjQuNzYgMTMgMjYgMTYgMzEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0IiAvPgoJPHBhdGggZD0iTTcuMDggMTEuNDZDOC42MiAxNCAxNSAyNCAxNSAyNEMxNSAyNCA3LjMgMjAgNSAyMEMzLjg0IDIwIDIgMjAuNDQgMiAyMS41OUMyIDIzIDQgMjIuODggNS40NiAyMy42MUM3Ljc2IDI0Ljc2IDEzIDI2IDE2IDMxQzE2IDMxIDIyIDMyIDI1IDMxQzI5LjMgMjkuNTYgMzIgMjggMzIgMjhDMzIgMjggMzIgMTkuMyAzMiAxN0MzMiAxNS4xNyAyOC45MSAxMS45IDI4IDEyQzI2LjQgMTIuMTYgMjkuNjkgMTUuNTMgMjguNTMgMTUuNTNDMjcuMzggMTUuNTMgMjUuMDUgMTAgMjIuNzUgMTBDMjAuNDQgMTAgMjMuOTIgMTQuMzggMjIuNzYgMTQuMzhDMjEuNjEgMTQuMzggMTguMyAxMCAxNiAxMEMxNCAxMCAxOC4xNSAxNSAxNyAxNUMxNi4zOCAxNSAxMy41NSAxMy45NCAxMS4yNCAxMC42QzkuNjIgOC4yNSA3LjM3IDQgNC44MyA0QzIuMzcgNCA1LjU0IDguOTIgNy4wOCAxMS40NnoiIGZpbGw9IiNmZmZmZmYiIC8+Cjwvc3ZnPgo=)",
      "default",
    ].join(),
    pointer: [
      "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3ZnIGhlaWdodD0iMzIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDY0IDY0IiB3aWR0aD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8ZGVmcz4KCQk8bGluZWFyR3JhZGllbnQgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjdXJzb3ItcG9pbnRlci0wIiB4MT0iNjgiIHgyPSI2OCIgeTE9IjUiIHkyPSIzMyI+CgkJCTxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgLz4KCQkJPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmJmYmZiIiAvPgoJCTwvbGluZWFyR3JhZGllbnQ+CgkJPHJhZGlhbEdyYWRpZW50IGN4PSIwIiBjeT0iMCIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwLjIwMzEsMCwwLDAuMjAzMSwyNywyNykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY3Vyc29yLXBvaW50ZXItMSIgcj0iNjQiPgoJCQk8c3RvcCBvZmZzZXQ9IjAuMjQ3MSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjIwNzgiIC8+CgkJCTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwIiAvPgoJCTwvcmFkaWFsR3JhZGllbnQ+CgkJPGxpbmVhckdyYWRpZW50IGlkPSJjdXJzb3ItcG9pbnRlci0yIiB4MT0iNjgiIHgyPSI2OCIgeTE9IjUiIHkyPSIzMyI+CgkJCTxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgLz4KCQkJPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmJmYmZiIiAvPgoJCTwvbGluZWFyR3JhZGllbnQ+Cgk8L2RlZnM+Cgk8cGF0aCBkPSJNMzIgMjhDMzIgMjggMzIgMTkuMyAzMiAxN0MzMiAxNS4xNyAyOC45MSAxMS45IDI4IDEyQzI2LjQgMTIuMTYgMjkuNjkgMTUuNTMgMjguNTMgMTUuNTNDMjcuMzggMTUuNTMgMjUuMDUgMTAgMjIuNzUgMTBDMjAuNDQgMTAgMjMuOTIgMTQuMzggMjIuNzYgMTQuMzhDMjEuNjEgMTQuMzggMTguMyAxMCAxNiAxMEMxNCAxMCAxOC4xNSAxNSAxNyAxNUMxNi4zOCAxNSAxMy41NSAxMy45NCAxMS4yNCAxMC42QzkuNjIgOC4yNSA3LjM3IDQgNC44MyA0QzIuMzcgNCA1LjU0IDguOTIgNy4wOCAxMS40NkM4LjYyIDE0IDE1IDI0IDE1IDI0QzE1IDI0IDcuMyAyMCA1IDIwQzMuODQgMjAgMiAyMC40NCAyIDIxLjU5QzIgMjMgNCAyMi44OCA1LjQ2IDIzLjYxQzcuNzYgMjQuNzYgMTMgMjYgMTYgMzEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0IiAvPgoJPHBhdGggZD0iTTcuMDggMTEuNDZDOC42MiAxNCAxNSAyNCAxNSAyNEMxNSAyNCA3LjMgMjAgNSAyMEMzLjg0IDIwIDIgMjAuNDQgMiAyMS41OUMyIDIzIDQgMjIuODggNS40NiAyMy42MUM3Ljc2IDI0Ljc2IDEzIDI2IDE2IDMxQzE2IDMxIDIyIDMyIDI1IDMxQzI5LjMgMjkuNTYgMzIgMjggMzIgMjhDMzIgMjggMzIgMTkuMyAzMiAxN0MzMiAxNS4xNyAyOC45MSAxMS45IDI4IDEyQzI2LjQgMTIuMTYgMjkuNjkgMTUuNTMgMjguNTMgMTUuNTNDMjcuMzggMTUuNTMgMjUuMDUgMTAgMjIuNzUgMTBDMjAuNDQgMTAgMjMuOTIgMTQuMzggMjIuNzYgMTQuMzhDMjEuNjEgMTQuMzggMTguMyAxMCAxNiAxMEMxNCAxMCAxOC4xNSAxNSAxNyAxNUMxNi4zOCAxNSAxMy41NSAxMy45NCAxMS4yNCAxMC42QzkuNjIgOC4yNSA3LjM3IDQgNC44MyA0QzIuMzcgNCA1LjU0IDguOTIgNy4wOCAxMS40NnoiIGZpbGw9InVybCgjY3Vyc29yLXBvaW50ZXItMCkiIC8+Cgk8cGF0aCBkPSJNMTYgMTZWNDBINDFWMTZIMTZ6IiBmaWxsPSJ1cmwoI2N1cnNvci1wb2ludGVyLTEpIiAvPgoJPHBhdGggZD0iTTIxLjUgMjkuNUwyNi41IDM0LjVMMzAuNSAzMC41TDM0IDM0VjIySDIyTDI1LjUgMjUuNUwyMS41IDI5LjV6IiBmaWxsPSJ1cmwoI2N1cnNvci1wb2ludGVyLTIpIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KPC9zdmc+Cg==)",
      "pointer",
    ].join(),
    text: [
      "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3ZnIGhlaWdodD0iNjQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHdpZHRoPSI2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxkZWZzPgoJCTxsaW5lYXJHcmFkaWVudCBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImN1cnNvci10ZXh0LTAiIHgxPSI2OCIgeDI9IjY4IiB5MT0iLTIiIHkyPSIzNCI+CgkJCTxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgLz4KCQkJPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZWRlZGVkIiAvPgoJCTwvbGluZWFyR3JhZGllbnQ+Cgk8L2RlZnM+Cgk8cGF0aCBkPSJNMTkgNEgxN0wxNSA1TDEzIDRIMTFDMTAgNCAxMCA2IDEwIDZIMTRWMzJIMTBDMTAgMzIgMTAgMzQgMTEgMzRIMTNMMTUgMzNMMTcgMzRIMTlDMjAgMzQgMjAgMzIgMjAgMzJIMTZWNkgyMEMyMCA2IDIwIDQgMTkgNHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0IiAvPgoJPHBhdGggZD0iTTE5IDRIMTdMMTUgNUwxMyA0SDExQzEwIDQgMTAgNiAxMCA2SDE0VjMySDEwQzEwIDMyIDEwIDM0IDExIDM0SDEzTDE1IDMzTDE3IDM0SDE5QzIwIDM0IDIwIDMyIDIwIDMySDE2VjZIMjBDMjAgNiAyMCA0IDE5IDR6IiBmaWxsPSJ1cmwoI2N1cnNvci10ZXh0LTApIiAvPgo8L3N2Zz4K) 2 8",
      "text",
    ].join(),
  },
  font: {
    family: {
      default: "Helvetica",
      monospace: FONT_COURIER_10_PITCH.title,
    },
  },
  scrollbar: {
    width: "1rem",
  },
  text: {
    color: {
      dark: "rgb(0, 0, 0)",
      default: textColorLight,
      disabled: "rgb(160, 160, 160)",
      light: textColorLight,
    },
  },
});
