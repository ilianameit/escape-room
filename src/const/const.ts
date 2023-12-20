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
  'easy', 'medium', 'hard'
}

export enum TypeQuest {
  'adventures', 'horror', 'mystic', 'detective', 'sci-fi'
}

export enum DateBooking {
  'today', 'tomorrow'
}

export const definitionLevels = {
  easy: 'лёгкий',
  medium: 'средний',
  hard: 'сложный',
};

export const definitionTypes = {
  all: {
    def: 'Все квесты',
    img: {
      width: 26,
      height: 30
    }
  },
  adventures: {
    def: 'Приключения',
    img: {
      width: 36,
      height: 30
    }
  },
  horror: {
    def: 'Ужасы',
    img: {
      width: 30,
      height: 30
    }
  },
  mystic: {
    def: 'Мистика',
    img: {
      width: 30,
      height: 30
    }
  },
  detective: {
    def: 'Детектив',
    img: {
      width: 40,
      height: 30
    }
  },
  'sci-fi': {
    def: 'Sci-fi',
    img: {
      width: 28,
      height: 30
    }
  },
};
