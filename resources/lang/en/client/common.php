<?php

return array (
  'project_members' => 
  array (
    'roles' => 
    array (
      'OWNER' => 
      array (
        'title' => 'Owner',
        'extra_title' => 'Full-Access',
      ),
      'ADMINISTRATOR' => 
      array (
        'title' => 'Administrator',
        'extra_title' => 'Full-Access',
        'description' => 'Can create, remove, modify, see, take tasks & add users, edit boards & lists.',
      ),
      'CONTRACTOR' => 
      array (
        'title' => 'Contractor',
        'extra_title' => 'Limited',
        'description' => 'Can view, rename, take tasks. Cannot manage boards or add new users.',
      ),
    ),
  ),
  'contracts' => 
  array (
    'roles' => 
    array (
      'EMPLOYER' => 
      array (
        'title' => 'Employer',
      ),
      'EMPLOYEE' => 
      array (
        'title' => 'Employee',
      ),
    ),
    'closed' => 'Closed',
    'active' => 'Active',
  ),
  'project_selector' => 
  array (
    'create_new_project' => 'Create a new Project',
    'create' => 'Create',
  ),
);
