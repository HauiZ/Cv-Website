const formatSalaryRangeToVND = (rangeStr) => {
  if (!rangeStr || typeof rangeStr !== "string") return "";

  const parts = rangeStr.split("-").map(part => part.trim());

  // Trường hợp chỉ có một số, không phải là range
  if (parts.length === 1) {
    const num = Number(parts[0]);
    return isNaN(num) ? rangeStr : `${num / 1_000_000} triệu`;
  }

  const [minStr, maxStr] = parts;
  const min = Number(minStr);
  const max = Number(maxStr);

  if (isNaN(min) || isNaN(max)) return rangeStr;

  return `${min / 1_000_000} triệu - ${max / 1_000_000} triệu`;
};

export default formatSalaryRangeToVND;
