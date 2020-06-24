<?php

return array (
  'project_members' => 
  array (
    'roles' => 
    array (
      'OWNER' => 
      array (
        'title' => 'Владелец',
        'extra_title' => 'Полный доступ',
      ),
      'ADMINISTRATOR' => 
      array (
        'title' => 'Администратор',
        'extra_title' => 'Полный доступ',
        'description' => 'Может создавать, удалять, изменять, просматривать, принимать задачи и добавлять пользователей, редактировать доски и списки.',
      ),
      'CONTRACTOR' => 
      array (
        'title' => 'Работник',
        'extra_title' => 'Ограниченный доступ',
        'description' => 'Может просматривать, переименовывать, принимать задачи. Не может редактировать доски или добавлять пользователей.',
      ),
    ),
  ),
  'contracts' => 
  array (
    'roles' => 
    array (
      'EMPLOYER' => 
      array (
        'title' => 'Работодатель',
      ),
      'EMPLOYEE' => 
      array (
        'title' => 'Сотрудник',
      ),
    ),
    'closed' => 'Закрыт',
    'active' => 'Активен',
  ),
  'project_selector' => 
  array (
    'create_new_project' => 'Создать новый Проект',
    'create' => 'Создать',
  ),
);
