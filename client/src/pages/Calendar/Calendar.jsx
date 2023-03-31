import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import './Calendar.css'
import useCalendar from '../../store/Calendar'
import { createEventId } from '../../data'

class Calendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentEvents: []
        };

        this.handleEvents = this.handleEvents.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
        this.handleEventClick = this.handleEventClick.bind(this);
    }

    handleEvents(events) {
        this.setState({ currentEvents: events });
    }

    handleDateSelect(selectInfo) {
        let title = prompt('Please enter a title for the event');
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.start,
                end: selectInfo.end,
                allDay: selectInfo.allDay
            });
        }
    }

    handleEventClick(clickInfo) {
        if (
            confirm('Are you sure you want to delete this event?')

        ) {
            clickInfo.event.remove();
        }
    }

    render() {
        return (
            <div className="calendar-container">

                <div>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                        headerToolbar={{

                            left: 'prev,next today',
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay"

                        }}

                        allDaySlot={false}
                        initialView="timeGridWeek"
                        slotDuration={"01:00:00"}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={true}
                        nowIndicator={true}
                        initialEvents={this.state.currentEvents}
                        eventsSet={this.handleEvents}
                        select={this.handleDateSelect}
                        eventClick={this.handleEventClick}
                    />
                </div>
            </div>
        );
    }
}

export default Calendar;