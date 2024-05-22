export default {
    throwError({settings, obj, msg}) {
        var json = {
            msg: msg || `ajax code: ${obj.code}`,
            req: settings,
            res: obj
        };

        setTimeout(() => {
            throw new Error(JSON.stringify(json));
        }, 0);
    }
};
