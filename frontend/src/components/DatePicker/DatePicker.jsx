import React from "react";
import { Button, CalendarCell, CalendarGrid, DateInput, DateRangePicker, DateSegment, Dialog, Group, Heading, Label, Popover, RangeCalendar } from "react-aria-components";
import './DatePicker.css'

export default function DatePicker({ label, value, onChange }) {
    return (
        <DateRangePicker className="field">
            <Label>{label}</Label>
            <Group>
                <DateInput slot="start">
                    {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <span aria-hidden="true">-</span>
                <DateInput slot="end">
                    {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <Button>▾</Button>
            </Group>
            <Popover>
                <Dialog>
                    <RangeCalendar value={value} onChange={onChange}>
                        <header>
                            <Button slot="previous">◀</Button>
                            <Heading />
                            <Button slot="next">▶</Button>
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