//OPTIONS POSSIBLE VALUE
//------------------------------
// weekday	        "narrow", "short", "long".	undefined
// era	            "narrow", "short", "long"	undefined
// year	            "2-digit", "numeric"	undefined or "numeric"
// month	          "2-digit", "numeric", "narrow", "short", "long"	undefined or "numeric"
// day	            "2-digit", "numeric"	undefined or "numeric"
// hour	            "2-digit", "numeric"	undefined
// minute	          "2-digit", "numeric"	undefined
// second	          "2-digit", "numeric"	undefined
// timeZoneName	    "short", "long".	This property is not currently supported.


export const getFormatDate = (): string => {
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }

    let date: Date = new Date()

    return (
        // date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        date.toLocaleDateString("en-US")
    )
}
