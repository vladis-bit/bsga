create or replace function public.pc_bookings_check_hours()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  _start_min int;
  _end_min int;
begin
  _start_min := extract(hour from NEW.starts_at)::int * 60 + extract(minute from NEW.starts_at)::int;
  _end_min := _start_min + (NEW.duration_hours * 60)::int;

  if _start_min < 7 * 60 then
    raise exception 'Rezervácia môže začínať najskôr o 7:00.';
  end if;
  if _start_min > 21 * 60 then
    raise exception 'Posledná rezervácia môže začínať o 21:00.';
  end if;
  if _end_min > 22 * 60 then
    raise exception 'Rezervácia musí skončiť najneskôr o 22:00.';
  end if;

  return NEW;
end;
$$;

drop trigger if exists pc_bookings_check_hours_trg on public.pc_bookings;
create trigger pc_bookings_check_hours_trg
before insert or update of starts_at, duration_hours on public.pc_bookings
for each row execute function public.pc_bookings_check_hours();