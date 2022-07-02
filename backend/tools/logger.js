import { createLogger , transports, format} from "winston";

const customFormat = format.combine(format.printf((info) => (`*****${info.level}*****   ${info.message}`)))

const logger = createLogger({
    format:customFormat,
    colorize:true,
    transports:[
        new transports.Console({level:"silly"}),
        new transports.File({filename:"app.log"})
    ]
})

export default logger;