import React from "react";
import { Button, CalendarCell, CalendarGrid, DateInput, DateRangePicker, DateSegment, Dialog, Group, Heading, Label, Popover, RangeCalendar } from "react-aria-components";
import './DatePicker.css'

export default function DatePicker({ label }) {
    return (
        <DateRangePicker className="field">
            <Label>{label}</Label>
            <Group className="date-input">
                <DateInput slot="start">
                    {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <span aria-hidden="true">-</span>
                <DateInput slot="end">
                    {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <Button className="calender">▾</Button>
            </Group>
            <Popover>
                <Dialog>
                    <RangeCalendar>
                        <header>
                            <Button className="previous" slot="previous">◀</Button>
                            <Heading />
                            <Button className="next" slot="next">▶</Button>
                        </header>
                        <CalendarGrid>
                            {(date) => <CalendarCell date={date} />}
                        </CalendarGrid>
                    </RangeCalendar>
                </Dialog>
            </Popover>
        </DateRangePicker>
    );
}