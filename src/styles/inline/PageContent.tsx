import React from "react"

const _mainPage: React.CSSProperties = {
    display: "flex",
    flexDirection: 'column',
    minWidth: 350,
    maxWidth: 350,
    // padding: 10,
    borderRight: "1px solid #F4F4F4",
}

const _subPage: React.CSSProperties = {
    overflowY: "auto",
    flexGrow: 1,
    // padding: 10,
}

const _page: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // alignItems: 'stretch'
}

const _listPage: React.CSSProperties = {
    overflowY: "auto",
    padding: 10,
}

export const PageContent = {
    Page: _page,
    MainPage: _mainPage,
    SubPage: _subPage,
    ListPage: _listPage,
}
