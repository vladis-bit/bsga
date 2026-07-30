create or replace function public.list_admin_users()
returns table (user_id uuid, email text, granted_at timestamptz)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.has_role(auth.uid(), 'admin'::public.app_role) then
    raise exception 'not authorized';
  end if;
  return query
  select ur.user_id, u.email::text, ur.created_at
  from public.user_roles ur
  join auth.users u on u.id = ur.user_id
  where ur.role = 'admin'::public.app_role
  order by ur.created_at asc;
end;
$$;

create or replace function public.grant_admin_by_email(_email text)
returns text
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  _uid uuid;
begin
  if not public.has_role(auth.uid(), 'admin'::public.app_role) then
    raise exception 'not authorized';
  end if;
  select id into _uid from auth.users where lower(email) = lower(trim(_email)) limit 1;
  if _uid is null then
    raise exception 'Používateľ s týmto e-mailom neexistuje. Najprv sa musí zaregistrovať.';
  end if;
  insert into public.user_roles (user_id, role)
  values (_uid, 'admin'::public.app_role)
  on conflict (user_id, role) do nothing;
  return 'ok';
end;
$$;

create or replace function public.revoke_admin_by_email(_email text)
returns text
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  _uid uuid;
begin
  if not public.has_role(auth.uid(), 'admin'::public.app_role) then
    raise exception 'not authorized';
  end if;
  select id into _uid from auth.users where lower(email) = lower(trim(_email)) limit 1;
  if _uid is null then
    raise exception 'Používateľ s týmto e-mailom neexistuje.';
  end if;
  if _uid = auth.uid() then
    raise exception 'Nemôžeš odobrať admin rolu sám sebe.';
  end if;
  delete from public.user_roles where user_id = _uid and role = 'admin'::public.app_role;
  return 'ok';
end;
$$;

revoke all on function public.list_admin_users() from public, anon;
revoke all on function public.grant_admin_by_email(text) from public, anon;
revoke all on function public.revoke_admin_by_email(text) from public, anon;
grant execute on function public.list_admin_users() to authenticated;
grant execute on function public.grant_admin_by_email(text) to authenticated;
grant execute on function public.revoke_admin_by_email(text) to authenticated;