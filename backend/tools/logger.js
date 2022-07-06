import { createLogger , transports, format} from "winston";

const customFormat = format.combine(format.printf((info) => {
    if (info.level == 'error') {
        return `!!!! error !!!!!    ${info.message}`;
    } else {
        return `*****${info.level}*****   ${info.message}`;
    }
}
));

const logger = createLogger({
    format:customFormat,
    colorize:true,
    transports:[
        new transports.Console({level:"silly"}),
        new transports.File({filename:"app.log"})
    ]
})

export default logger;