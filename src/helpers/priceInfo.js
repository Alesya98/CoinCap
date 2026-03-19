export const formatPriceInfo = (value) => {
        const num = parseFloat(value).toFixed(2);
        if (!num && num !== 0) return "-";
        if (num === "-0.00") return "0.00";

        const color = num < 0.0 ? "price-down" : "price-up";

    return {num, color}
}