import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "txt": {
        "fontSize": 14,
        "color": "#331",
        "fontFamily": "'微软雅黑'",
        "position": "relative"
    },
    "txt-menu": {
        "fontSize": 14,
        "color": "#331",
        "fontFamily": "'微软雅黑'",
        "minWidth": 320,
        "position": "relative",
        "top": 0,
        "lineHeight": 1,
        "left": 0,
        "whiteSpace": "nowrap",
        "opacity": 0.6,
        "height": 36,
        "zIndex": 1000,
        "backgroundColor": "#000"
    },
    "txt-input": {
        "fontSize": 14,
        "color": "#000",
        "fontFamily": "arial, sans-serif",
        "lineHeight": 20,
        "position": "absolute",
        "width": "100%",
        "left": 0,
        "top": 0,
        "height": 36,
        "background": "#333",
        "border": "none",
        "textAlign": "center",
        "display": "none"
    },
    "txt textarea": {
        "fontSize": 14,
        "color": "#331",
        "fontFamily": "'微软雅黑'",
        "border": "none",
        "background": "none",
        "width": "100%",
        "Height": 200,
        "minHeight": 200,
        "resize": "none"
    },
    "txt:focus": {
        "outline": "none"
    },
    "txt fieldset": {
        "border": 0
    },
    "img": {
        "border": 0
    },
    "txt blockquote": {
        "paddingLeft": 10,
        "borderLeft": "4px solid rgba(40, 213, 51, 1.00)",
        "marginBottom": 14
    },
    "txt a": {
        "color": "rgba(40, 213, 51, 1.00)"
    },
    "txt del": {
        "textDecoration": "line-through"
    },
    "txt sub": {
        "fontSize": "75%",
        "position": "relative",
        "verticalAlign": "text-top",
        "bottom": -0.25
    },
    "txt sup": {
        "fontSize": "75%",
        "position": "relative",
        "verticalAlign": "text-top",
        "top": -0.5
    },
    ":root txt sub": {
        "verticalAlign": "baseline"
    },
    ":root txt sup": {
        "verticalAlign": "baseline"
    },
    "txt hr": {
        "border": 0,
        "borderBottom": "1px solid #cfcfcf",
        "marginBottom": 21,
        "Color": "pink",
        "Filter": "chroma(color=pink)",
        "height": 10,
        "Margin": "-7px 0 15px",
        "marginTop": 21,
        "borderTop": "3px solid mediumseagreen"
    },
    "txt small": {
        "fontSize": 0.8,
        "color": "#888"
    },
    "txt em": {
        "fontWeight": "700"
    },
    "txt b": {
        "fontWeight": "700"
    },
    "txt strong": {
        "fontWeight": "700"
    },
    "txt pre": {
        "whiteSpace": "pre-wrap",
        "paddingTop": 0.85,
        "paddingRight": 0.85,
        "paddingBottom": 0.85,
        "paddingLeft": 0.85,
        "background": "#f8f8f8",
        "marginBottom": 14
    },
    "txt p": {
        "marginBottom": 14
    },
    "txt ul": {
        "marginBottom": 14,
        "marginLeft": 1.2,
        "listStyle": "disc"
    },
    "txt ol": {
        "marginBottom": 14,
        "marginLeft": 1.2,
        "listStyle": "decimal"
    },
    "txt dl": {
        "marginBottom": 14
    },
    "txt form": {
        "marginBottom": 14
    },
    "txt table": {
        "marginBottom": 14
    },
    "txt h1": {
        "marginBottom": 16,
        "fontWeight": "700",
        "lineHeight": 1.2,
        "fontSize": 2
    },
    "txt h2": {
        "marginBottom": 16,
        "fontWeight": "700",
        "lineHeight": 1.2,
        "fontSize": 1.8
    },
    "txt h3": {
        "marginBottom": 16,
        "fontWeight": "700",
        "lineHeight": 1.2,
        "fontSize": 1.6
    },
    "txt h4": {
        "marginBottom": 16,
        "fontWeight": "700",
        "lineHeight": 1.2,
        "fontSize": 1.4
    },
    "txt h5": {
        "marginBottom": 16,
        "fontWeight": "700",
        "lineHeight": 1.2,
        "fontSize": 1.2
    },
    "txt h6": {
        "marginBottom": 16,
        "fontWeight": "700",
        "lineHeight": 1.2,
        "fontSize": 1.2
    },
    "txt-ul": {
        "listStyle": "disc"
    },
    "txt-ol": {
        "listStyle": "decimal"
    },
    "txt li ul": {
        "marginTop": 0,
        "marginRight": 2,
        "marginBottom": 0,
        "marginLeft": 1.2,
        "listStyle": "circle"
    },
    "txt li ol": {
        "marginTop": 0,
        "marginRight": 2,
        "marginBottom": 0,
        "marginLeft": 1.2
    },
    "txt-ul ul": {
        "marginTop": 0,
        "marginRight": 2,
        "marginBottom": 0,
        "marginLeft": 1.2,
        "listStyle": "circle"
    },
    "txt-ul ol": {
        "marginTop": 0,
        "marginRight": 2,
        "marginBottom": 0,
        "marginLeft": 1.2
    },
    "txt-ol ul": {
        "marginTop": 0,
        "marginRight": 2,
        "marginBottom": 0,
        "marginLeft": 1.2,
        "listStyle": "circle"
    },
    "txt-ol ol": {
        "marginTop": 0,
        "marginRight": 2,
        "marginBottom": 0,
        "marginLeft": 1.2
    },
    "txt-menu [class^=\"icon-\"]": {
        "background": "transparent",
        "backgroundImage": "none"
    },
    "txt-menu [class*=\" icon-\"]": {
        "background": "transparent",
        "backgroundImage": "none"
    },
    "txt-icon": {
        "font": "normal 900 16px/40px Georgia serif",
        "minWidth": 20,
        "display": "inline-block",
        "paddingTop": 0,
        "paddingRight": 10,
        "paddingBottom": 0,
        "paddingLeft": 10,
        "height": 36,
        "overflow": "hidden",
        "color": "#fff",
        "textAlign": "center",
        "cursor": "pointer",
        "MozUserSelect": "none",
        "WebkitUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none"
    },
    "txt-icon:first-of-type": {
        "borderTopLeftRadius": 3,
        "borderBottomLeftRadius": 3
    },
    "txt-icon:last-of-type": {
        "borderTopRightRadius": 3,
        "borderBottomRightRadius": 3
    },
    "txt-icon:hover": {
        "background": "#000"
    },
    "txt-iconactive": {
        "color": "rgba(40, 213, 51, 1.00)",
        "background": "#000",
        "boxShadow": "inset 2px 2px 4px #000"
    },
    "txt-input:focus": {
        "outline": "none"
    },
    "txt-menu txt-input": {
        "backgroundColor": "#fff",
        "height": 54
    },
    "txt-textarea": {
        "display": "block",
        "background": "#f8f8f8",
        "paddingTop": 20,
        "paddingRight": 20,
        "paddingBottom": 20,
        "paddingLeft": 20
    },
    "txt-menu [class^=\"icon-\"]:before": {
        "fontFamily": "txt",
        "fontStyle": "normal",
        "fontWeight": "normal",
        "speak": "none",
        "display": "inline-block",
        "textDecoration": "inherit",
        "width": 1,
        "marginRight": 0.2,
        "textAlign": "center",
        "fontVariant": "normal",
        "textTransform": "none",
        "lineHeight": 1,
        "marginLeft": 0.2
    },
    "txt-menu [class*=\" icon-\"]:before": {
        "fontFamily": "txt",
        "fontStyle": "normal",
        "fontWeight": "normal",
        "speak": "none",
        "display": "inline-block",
        "textDecoration": "inherit",
        "width": 1,
        "marginRight": 0.2,
        "textAlign": "center",
        "fontVariant": "normal",
        "textTransform": "none",
        "lineHeight": 1,
        "marginLeft": 0.2
    },
    "txt-menu icon-dogo:before": {
        "content": "'\\e817'",
        "transform": "rotateY(180deg)",
        "MsTransform": "rotateY(180deg)",
        "MozTransform": "rotateY(180deg)",
        "WebkitTransform": "rotateY(180deg)",
        "OTransform": "rotateY(180deg)"
    },
    "txt-menu icon-doback:before": {
        "content": "'\\e817'"
    },
    "txt-menu icon-location:before": {
        "content": "'\\e815'"
    },
    "txt-menu icon-fit:before": {
        "content": "'\\e80f'"
    },
    "txt-menu icon-bold:before": {
        "content": "'\\e805'"
    },
    "txt-menu icon-italic:before": {
        "content": "'\\e806'"
    },
    "txt-menu icon-justifyleft:before": {
        "content": "'\\e80a'"
    },
    "txt-menu icon-justifycenter:before": {
        "content": "'\\e80b'"
    },
    "txt-menu icon-justifyright:before": {
        "content": "'\\e80c'"
    },
    "txt-menu icon-justifyfull:before": {
        "content": "'\\e80d'"
    },
    "txt-menu icon-outdent:before": {
        "content": "'\\e800'"
    },
    "txt-menu icon-indent:before": {
        "content": "'\\e801'"
    },
    "txt-menu icon-mode:before": {
        "content": "'\\e813'"
    },
    "txt-menu icon-fullscreen:before": {
        "content": "'\\e80e'"
    },
    "txt-menu icon-insertunorderedlist:before": {
        "content": "'\\e802'"
    },
    "txt-menu icon-insertorderedlist:before": {
        "content": "'\\e803'"
    },
    "txt-menu icon-strikethrough:before": {
        "content": "'\\e807'"
    },
    "txt-menu icon-underline:before": {
        "content": "'\\e804'"
    },
    "txt-menu icon-blockquote:before": {
        "content": "'\\e814'"
    },
    "txt-menu icon-undo:before": {
        "content": "'\\e817'"
    },
    "txt-menu icon-code:before": {
        "content": "'\\e816'"
    },
    "txt-menu icon-pre:before": {
        "content": "'\\e816'"
    },
    "txt-menu icon-unlink:before": {
        "content": "'\\e811'"
    },
    "txt-menu icon-superscript:before": {
        "content": "'\\e808'"
    },
    "txt-menu icon-subscript:before": {
        "content": "'\\e809'"
    },
    "txt-menu icon-inserthorizontalrule:before": {
        "content": "'\\e818'"
    },
    "txt-menu icon-pin:before": {
        "content": "'\\e812'"
    },
    "txt-menu icon-createlink:before": {
        "content": "'\\e810'"
    },
    "txt-menu icon-h1:before": {
        "content": "'H1'"
    },
    "txt-menu icon-h2:before": {
        "content": "'H2'"
    },
    "txt-menu icon-h3:before": {
        "content": "'H3'"
    },
    "txt-menu icon-h4:before": {
        "content": "'H4'"
    },
    "txt-menu icon-h5:before": {
        "content": "'H5'"
    },
    "txt-menu icon-h6:before": {
        "content": "'H6'"
    },
    "txt-menu icon-p:before": {
        "content": "'P'"
    },
    "txt-menu icon-insertimage:before": {
        "width": 1.8,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "position": "relative",
        "top": -2,
        "content": "'IMG'",
        "fontSize": 12,
        "border": "1px solid #fff",
        "paddingTop": 2,
        "paddingRight": 2,
        "paddingBottom": 2,
        "paddingLeft": 2,
        "borderRadius": 2
    },
    "txthinted h1:before": {
        "color": "#eee",
        "position": "absolute",
        "right": "100%",
        "whiteSpace": "nowrap",
        "paddingRight": 10,
        "content": "#"
    },
    "txthinted h2:before": {
        "color": "#eee",
        "position": "absolute",
        "right": "100%",
        "whiteSpace": "nowrap",
        "paddingRight": 10,
        "content": "##"
    },
    "txthinted h3:before": {
        "color": "#eee",
        "position": "absolute",
        "right": "100%",
        "whiteSpace": "nowrap",
        "paddingRight": 10,
        "content": "###"
    },
    "txthinted h4:before": {
        "color": "#eee",
        "position": "absolute",
        "right": "100%",
        "whiteSpace": "nowrap",
        "paddingRight": 10,
        "content": "####"
    },
    "txthinted h5:before": {
        "color": "#eee",
        "position": "absolute",
        "right": "100%",
        "whiteSpace": "nowrap",
        "paddingRight": 10,
        "content": "#####"
    },
    "txthinted h6:before": {
        "color": "#eee",
        "position": "absolute",
        "right": "100%",
        "whiteSpace": "nowrap",
        "paddingRight": 10,
        "content": "######"
    },
    "txthinted blockquote:before": {
        "color": "rgba(40, 213, 51, 1.00)",
        "position": "absolute",
        "right": "100%",
        "whiteSpace": "nowrap",
        "paddingRight": 10,
        "content": ">",
        "fontWeight": "bold",
        "verticalAlign": "center"
    },
    "txthinted hr:before": {
        "color": "#eee",
        "position": "absolute",
        "right": "100%",
        "whiteSpace": "nowrap",
        "paddingRight": 10,
        "content": "﹘﹘﹘",
        "lineHeight": 1.2,
        "verticalAlign": "bottom"
    },
    "txthinted blockquote": {
        "borderLeft": 0,
        "marginLeft": 0,
        "paddingLeft": 0
    },
    "txthinted pre:before": {
        "content": "```",
        "display": "block",
        "color": "#ccc"
    },
    "txthinted pre:after": {
        "content": "```",
        "display": "block",
        "color": "#ccc"
    },
    "txthinted ul": {
        "listStyle": "none"
    },
    "txthinted ul li:before": {
        "content": "*",
        "color": "#999",
        "lineHeight": 1,
        "verticalAlign": "bottom",
        "marginLeft": -1.2,
        "display": "inline-block",
        "width": 1.2
    },
    "txthinted b:before": {
        "content": "**",
        "color": "#eee",
        "fontWeight": "normal"
    },
    "txthinted b:after": {
        "content": "**",
        "color": "#eee",
        "fontWeight": "normal"
    },
    "txthinted i:before": {
        "content": "*",
        "color": "#eee"
    },
    "txthinted i:after": {
        "content": "*",
        "color": "#eee"
    },
    "txthinted a": {
        "textDecoration": "none"
    },
    "txthinted a:before": {
        "content": "[",
        "color": "#ddd"
    },
    "txthinted a:after": {
        "content": "](\" attr(href) \")",
        "color": "#ddd"
    },
    "txt hr::after": {
        "fontFamily": "SegoeUI, 'Segoe UI', \"Open Sans\",Helvetica",
        "content": "END",
        "textAlign": "center",
        "width": 80,
        "height": 25,
        "backgroundColor": "white",
        "fontSize": 20,
        "color": "mediumseagreen",
        "fontWeight": "bold",
        "display": "inline-block",
        "position": "relative",
        "top": -20,
        "left": "45%"
    },
    "txt-placeholder:after": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "content": "attr(data-placeholder)",
        "color": "#fff",
        "cursor": "text"
    },
    "nav tools-height i": {
        "height": 55,
        "lineHeight": 60
    },
    "txt-preview": {
        "position": "fixed",
        "width": 120,
        "height": 400,
        "backgroundColor": "rgba(25, 15, 15, 0.39)",
        "top": 31,
        "right": 0,
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 0
    },
    "txt-preview div": {
        "font": "0.8em/1.6em '微软雅黑'",
        "whiteSpace": "nowrap",
        "textOverflow": "ellipsis",
        "overflow": "hidden"
    },
    "txt-preview div:hover": {
        "opacity": 0.5,
        "cursor": "pointer"
    },
    "txt-preview txt-h1": {
        "paddingLeft": 8,
        "color": "#E1BBFD",
        "width": 122
    },
    "txt-preview txt-h2": {
        "paddingLeft": 16,
        "color": "#FDFF7C",
        "width": 114
    },
    "txt-preview txt-h3": {
        "paddingLeft": 24,
        "color": "#C7FF81",
        "width": 106
    },
    "txt-preview txt-h4": {
        "paddingLeft": 32,
        "color": "#88C8EC",
        "width": 98
    },
    "txt-preview txt-h5": {
        "paddingLeft": 40,
        "color": "#FFC3E9",
        "width": 90
    }
});