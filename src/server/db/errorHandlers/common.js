export function internalError(res, err) {
    console.error(err);

    return res.status(500).json({
        code: "INTERNAL_ERROR",
        message: "Internal server error."
    });
}