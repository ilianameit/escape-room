export enum AppRoutes {
  Main = '/',
  Login = '/login',
  NotFound = '/not-found',
  Booking = '/booking',
  Contacts = '/contacts',
  Quest = '/quest/',
  MyQuests= '/my-quests'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const currAuthorizationStatus = AuthorizationStatus.Auth;

export enum LevelQuest {
  'any', 'easy', 'medium', 'hard'
}

export enum TypeQuest {
  'all', 'adventures', 'horror', 'mystic', 'detective', 'sci-fi'
}

export enum DateBooking {
  'today', 'tomorrow'
}

export const definitionLevels = {
  [LevelQuest[LevelQuest.any]]: 'любой',
  [LevelQuest[LevelQuest.easy]]: 'лёгкий',
  [LevelQuest[LevelQuest.medium]]: 'средний',
  [LevelQuest[LevelQuest.hard]]: 'сложный',
};
export const definitionTypes = {
  [TypeQuest[TypeQuest.all]]: {
    def: 'Все квесты',
    img: {
      width: 26,
      height: 30
    }
  },
  [TypeQuest[TypeQuest.adventures]]: {
    def: 'Приключения',
    img: {
      width: 36,
      height: 30
    }
  },
  [TypeQuest[TypeQuest.horror]]: {
    def: 'Ужасы',
    img: {
      width: 30,
      height: 30
    }
  },
  [TypeQuest[TypeQuest.mystic]]: {
    def: 'Мистика',
    img: {
      width: 30,
      height: 30
    }
  },
  [TypeQuest[TypeQuest.detective]]: {
    def: 'Детектив',
    img: {
      width: 40,
      height: 30
    }
  },
  [TypeQuest[TypeQuest['sci-fi']]]: {
    def: 'Sci-fi',
    img: {
      width: 28,
      height: 30
    }
  },
};
export const dateBooking = {
  [DateBooking[DateBooking.today]]: 'Сегодня',
  [DateBooking[DateBooking.tomorrow]]: 'Завтра'
};

export enum NameSpace {
  Quest = 'QUEST',
  Booking = 'BOOKING',
  Reservation = 'RESERVATION',
  User = 'USER'
}

export enum APIRoute {
  Quest = '/quest',
  Reservation = '/reservation',
  Login = '/login',
  Logout = '/logout',
  Booking = '/booking',
}
