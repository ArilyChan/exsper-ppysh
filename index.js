// Koishi插件名
module.exports.name = "Exsper-plugins";

// 插件处理和输出
module.exports.apply = (ctx, options, storage) => {
    const OsuBeatmapInfo = require("osu-beatmap-info");
    let obi = new OsuBeatmapInfo(options.OsuBeatmapInfo);

    const ppyshQuery = require("ppysh-query");

    let psq = new ppyshQuery(options.ppyshQuery);

    ctx.middleware(async (meta, next) => {
        try {
            let message = meta.message;
            let userId = meta.userId;
            let reply = await obi.apply(message);
            if (reply) return meta.$send(`[CQ:at,qq=${userId}]` + "\n" + reply);
            reply = await psq.apply(userId, message);
            if (reply) return meta.$send(`[CQ:at,qq=${userId}]` + "\n" + reply);
            return next();
        }
        catch (ex) {
            console.log(ex);
            return next();
        }
    });
};
