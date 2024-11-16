import {Api} from '@/src/api';
import CustomEventType from '@/src/types/CustomEvent';
import EventResponse from '@/src/types/EventResponse';
import { fakeBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { CookieValueTypes } from 'cookies-next';

export const eventSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'eventApi',
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    getEvents: builder.query<EventResponse[], CookieValueTypes>({
      queryFn: async (companyId: CookieValueTypes) => {
        try {
          const events = await Api.getEvents(companyId);
          
          return {data: events}
        } catch (error) {
          return { error: {data: error as Error}};
        }
      },
      providesTags: ['Event']
    }),

    addEvent: builder.mutation({
      queryFn: async (event: CustomEventType) => {        
        try {
           await Api.addEvent(event)
        } catch (error) {
          return {error: error}
        }
        return {data: null};
      },
      invalidatesTags: ['Event'],
    }),

    editEvent: builder.mutation({
      queryFn: async (event: CustomEventType) => {
        try {
          const updatedEvent = await Api.updateEvent(event);
          return {data: updatedEvent}
        } catch (error) {
          return {error: error}
        }
      },
      invalidatesTags: ['Event'],
    }),

    deleteEvent: builder.mutation({
      queryFn: async (eventId: string) => {
        try {
          await Api.deleteEvent(eventId)
          return {data: null}
        } catch (error) {
            return {error: error}
        }
      },
      invalidatesTags: ['Event'],
    })
  })
});


export const {useAddEventMutation, useGetEventsQuery, useEditEventMutation, useDeleteEventMutation } = eventSlice;