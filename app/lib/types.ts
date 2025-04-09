export type Leave = {
    name: string,
    from: string,
    to: string
}

export type LeaveList = {
    list: Leave[]
}

export type CalendarDetails = {
    title: string,
    start: string,
    end: string, 
    backgroundColor: string,
    borderColor: string,
    textColor: string
}