const Event = require('../../models/events');
const EventThumbnail = require('../../models/event_thumbnail');
const Images = require('../../models/images');

const getEvent = async (event_id) => {
    try {
        const [event, thumbnail] = await Promise.all([
            await Event.findByPk(event_id),
            await EventThumbnail.findOne({
                where: {
                    event_id
                }
            })
        ])

        if (!event) return {}

        const image = await Images.findByPk(thumbnail.dataValues.image_id)

        const dateLocalizationOpts = { weekday: "long", day: "numeric", month: "long", year: "numeric" }
        
        return {
            ...event.dataValues,
            start_date: new Date(event.dataValues.start_date).toLocaleString("en-US", dateLocalizationOpts),
            end_date: new Date(event.dataValues.end_date).toLocaleString("en-US", dateLocalizationOpts),
            day: new Date(event.dataValues.start_date).toLocaleString("en-US", { weekday: "long" }),
            image: image.dataValues.url ?? ""
        }
    } catch (err) {
        console.error(err.message)
        return {}
    }
}

module.exports = getEvent