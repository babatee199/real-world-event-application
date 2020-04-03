import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  eventTotal: 0,
  event: {},
  perPage: 3
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT_TOTAL(state, eventTotal) {
    state.eventTotal = eventTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'sucess',
          message: 'Congratulations! Your event has been created successfully'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message:
            'Sorry! There is an issue posting your event this could be due to ' +
            error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit('SET_EVENT_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
        //console.log(this.events)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message:
            'There was a problem fetching events. This could be due to ' +
            error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id).then(response => {
        commit('SET_EVENT', response.data)
        return response.data
      })
    }
  }
}

export const getters = {
  getEventById: function(state) {
    return function(id) {
      return state.events.find(event => event.id === id)
    }
  }
}
