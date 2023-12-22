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
  adventures: 'Приключения',
  horror: 'Ужасы',
  mystic: 'Мистика',
  detective: 'Детектив',
  'sci-fi': 'Sci-fi',
};
