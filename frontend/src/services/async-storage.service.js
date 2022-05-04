export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

function query(entityType) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || []
  return Promise.resolve(entities)
}

function get(entityType, entityId) {
  return query(entityType).then((entities) =>
    entities.find((entity) => entity._id === entityId)
  )
}
function post(entityType, newEntity) {
  newEntity._id = _makeId()
  return query(entityType).then((entities) => {
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  })
}
function postMany(entityType, newEntities) {
  return query(entityType).then((entities) => {
    newEntities = newEntities.map((entity) => ({ ...entity, _id: _makeId() }))
    entities.push(...newEntities)
    _save(entityType, entities)
    return entities
  })
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

if (!localStorage.board) makeBoard()

function makeBoard() {
  _save('board', [
    {
      _id: 'b101',
      title: 'Type your title',
      createdAt: 1651365468605,

      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#00ecd1',
        '#1e90ff',
        '#c71585',
        '#c7f5a5',
        '#c7158577',
      ],
      style: {},
      labels: [
        {
          id: 'l101',
          title: 'Done',
          color: '#61bd4f',
        },
        {
          id: 'l102',
          title: 'Progress',
          color: '#61bd33',
        },
      ],
      members: [
        {
          _id: 'u101',
          fullname: 'Shlomi Nugarker',
          imgUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          _id: 'u102',
          fullname: 'Nadia Blum',
          imgUrl:
            'https://media-exp1.licdn.com/dms/image/C4E03AQEnH6Lj0aymwg/profile-displayphoto-shrink_800_800/0/1650388602421?e=1657152000&v=beta&t=tsNDkf7ek1ei69b1_aAQFIQjeJiAvYnPdW-RiK2TaZA',
        },
        {
          _id: 'u103',
          fullname: 'dana Israeli',
          imgUrl:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
        },
      ],
      groups: [
        {
          id: 'g101',
          title: 'Add a group name',
          color: '#784bd1',
          tasks: [
            {
              id: 'c101',
              title: 'Replace logo',
              status: 'Done',
              priority: 'High',
              text: 'Finish !',
              'status-picker': {
                text: 'null',
                color: 'null',
              },
              timeline: {
                startDate: '',
                endDate: '',
              },
            },
            {
              id: 'c102',
              title: 'Add cmps !',
              status: 'Stuck',
              timeline: {
                startDate: '',
                endDate: '',
              },
            },
          ],
          style: {},
        },
        {
          id: 'g102',
          title: 'Add a group name',
          color: '#1677ee',
          tasks: [
            {
              id: 'c103',
              title: 'Do that',
              status: 'Working on it',
              priority: 'High',
              text: 'Finish !',
              timeline: {
                startDate: 1651365468605,
                endDate: 1651369468605,
              },
            },
            {
              id: 'c104',
              title: 'Help me',
              status: 'Working on it',
              timeline: {
                startDate: 1589983468418,
                endDate: 1589983468418,
              },
              description: 'description',
              comments: [
                {
                  id: 'ZdPnm',
                  txt: 'also @yaronb please CR this',
                  createdAt: 1651369468605,
                  byMember: {
                    _id: 'u101',
                    fullname: 'Shlomi Nugarker',
                    imgUrl:
                      'https://media-exp1.licdn.com/dms/image/C4E03AQEnH6Lj0aymwg/profile-displayphoto-shrink_800_800/0/1650388602421?e=1657152000&v=beta&t=tsNDkf7ek1ei69b1_aAQFIQjeJiAvYnPdW-RiK2TaZA',
                  },
                },
              ],
              checklists: [
                {
                  id: 'YEhmF',
                  title: 'Checklist',
                  todos: [
                    {
                      id: '212jX',
                      title: 'To Do 1',
                      isDone: false,
                    },
                  ],
                },
              ],
              members: [
                {
                  _id: 'u101',
                  username: 'Shlomi',
                  fullname: 'Shlomi Nugarker',
                  imgUrl:
                    'https://media-exp1.licdn.com/dms/image/C4E03AQEnH6Lj0aymwg/profile-displayphoto-shrink_800_800/0/1650388602421?e=1657152000&v=beta&t=tsNDkf7ek1ei69b1_aAQFIQjeJiAvYnPdW-RiK2TaZA',
                },
                {
                  _id: 'u102',
                  username: 'Israel',
                  fullname: 'Israel Israeli',
                  imgUrl:
                    'https://images.maariv.co.il/image/upload/f_auto,fl_lossy/c_fill,g_faces:center,h_792,w_900/565343',
                },
              ],
              labelIds: ['l101', 'l102'],
              createdAt: 1590999730348,
              dueDate: 16156215211,
              byMember: {
                _id: 'u101',
                username: 'Dan',
                fullname: 'Tal',
                imgUrl:
                  'https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=382&q=80',
              },
              style: {
                bgColor: '#26de81',
              },
            },
          ],
          style: {},
        },
      ],

      activitiesLog: [
        {
          id: 'a101',
          txt: 'Changed Color',
          createdAt: 154514,
          byMember: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
          },
          task: {
            id: 'c101',
            title: 'Replace Logo',
          },
        },
      ],

      cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
    },
  ])
}
