export function addDays(date: string, days: number) {
    const dateCopy = new Date(date);
    dateCopy.setDate(dateCopy.getDate() + days);
    return dateCopy;
}
