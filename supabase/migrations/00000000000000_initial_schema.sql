-- Migration: Initial Schema
-- Description: Criação das tabelas principais, políticas RLS e funções para o SaveThis.day

-- ============================================
-- EXTENSIONS
-- ============================================
create extension if not exists "uuid-ossp"; -- NOLINT

-- ============================================
-- TABELAS
-- ============================================

-- Tabela: parties (Eventos/Festas)
create table if not exists public.parties (
    id uuid primary key default gen_random_uuid(),
    created_at timestamp with time zone default now(),
    name text not null,
    slug text not null unique,
    date timestamp with time zone,
    location text,
    description text,
    owner_id uuid not null references auth.users(id) on delete cascade,
    cover_image text,
    theme_color text default '#8B5CF6',
    is_public boolean default true,
    rsvp_deadline timestamp with time zone,
    max_guests integer,
    allow_plus_one boolean default true,
    custom_message text
);

-- Tabela: guests (Convidados)
create table if not exists public.guests (
    id uuid primary key default gen_random_uuid(),
    created_at timestamp with time zone default now(),
    name text not null,
    contact text,
    code text not null unique default substring(md5(random()::text), 1, 8),
    note text,
    party_id uuid not null references public.parties(id) on delete cascade,
    dietary_restrictions text,
    confirmed boolean default false
);

-- Tabela: rsvps (Confirmações de presença)
create table if not exists public.rsvps (
    id uuid primary key default gen_random_uuid(),
    created_at timestamp with time zone default now(),
    party_id uuid not null references public.parties(id) on delete cascade,
    name text not null,
    contact text not null,
    adults integer default 1,
    children integer default 0,
    message text,
    guest_id uuid references public.guests(id) on delete set null
);

-- Tabela: photos (Fotos do evento)
create table if not exists public.photos (
    id uuid primary key default gen_random_uuid(),
    created_at timestamp with time zone default now(),
    party_id uuid not null references public.parties(id) on delete cascade,
    guest_id uuid references public.guests(id) on delete set null,
    path text not null,
    caption text,
    is_public boolean default false,
    is_approved boolean default false
);

-- Tabela: gifts (Lista de presentes)
create table if not exists public.gifts (
    id uuid primary key default gen_random_uuid(),
    created_at timestamp with time zone default now(),
    party_id uuid not null references public.parties(id) on delete cascade,
    name text not null,
    description text,
    image_url text,
    price decimal(10,2),
    external_link text,
    is_purchased boolean default false,
    purchased_by text,
    purchased_at timestamp with time zone,
    priority integer default 0
);

-- ============================================
-- ÍNDICES
-- ============================================
create index if not exists idx_parties_owner on public.parties(owner_id);
create index if not exists idx_parties_slug on public.parties(slug);
create index if not exists idx_guests_party on public.guests(party_id);
create index if not exists idx_guests_code on public.guests(code);
create index if not exists idx_rsvps_party on public.rsvps(party_id);
create index if not exists idx_photos_party on public.photos(party_id);
create index if not exists idx_gifts_party on public.gifts(party_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS em todas as tabelas
alter table public.parties enable row level security;
alter table public.guests enable row level security;
alter table public.rsvps enable row level security;
alter table public.photos enable row level security;
alter table public.gifts enable row level security;

-- ============================================
-- POLÍTICAS: PARTIES
-- ============================================

-- Dono pode ver suas próprias festas
create policy "Owners can view their parties"
    on public.parties for select
    using (auth.uid() = owner_id);

-- Dono pode criar festas
create policy "Authenticated users can create parties"
    on public.parties for insert
    with check (auth.uid() = owner_id);

-- Dono pode atualizar suas festas
create policy "Owners can update their parties"
    on public.parties for update
    using (auth.uid() = owner_id);

-- Dono pode deletar suas festas
create policy "Owners can delete their parties"
    on public.parties for delete
    using (auth.uid() = owner_id);

-- Festas públicas podem ser vistas por qualquer um (para página pública)
create policy "Public parties are viewable by everyone"
    on public.parties for select
    using (is_public = true);

-- ============================================
-- POLÍTICAS: GUESTS
-- ============================================

-- Dono da festa pode ver convidados
create policy "Party owners can view guests"
    on public.guests for select
    using (
        exists (
            select 1 from public.parties
            where parties.id = guests.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- Dono da festa pode criar convidados
create policy "Party owners can create guests"
    on public.guests for insert
    with check (
        exists (
            select 1 from public.parties
            where parties.id = guests.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- Dono da festa pode atualizar convidados
create policy "Party owners can update guests"
    on public.guests for update
    using (
        exists (
            select 1 from public.parties
            where parties.id = guests.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- Dono da festa pode deletar convidados
create policy "Party owners can delete guests"
    on public.guests for delete
    using (
        exists (
            select 1 from public.parties
            where parties.id = guests.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- ============================================
-- POLÍTICAS: RSVPS
-- ============================================

-- Qualquer um pode criar RSVP (para formulário público)
create policy "Anyone can create RSVPs"
    on public.rsvps for insert
    with check (true);

-- Dono da festa pode ver RSVPs
create policy "Party owners can view RSVPs"
    on public.rsvps for select
    using (
        exists (
            select 1 from public.parties
            where parties.id = rsvps.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- Dono da festa pode deletar RSVPs
create policy "Party owners can delete RSVPs"
    on public.rsvps for delete
    using (
        exists (
            select 1 from public.parties
            where parties.id = rsvps.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- ============================================
-- POLÍTICAS: PHOTOS
-- ============================================

-- Dono da festa pode ver todas as fotos
create policy "Party owners can view all photos"
    on public.photos for select
    using (
        exists (
            select 1 from public.parties
            where parties.id = photos.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- Fotos públicas aprovadas podem ser vistas por qualquer um
create policy "Public approved photos are viewable by everyone"
    on public.photos for select
    using (is_public = true and is_approved = true);

-- Dono da festa pode criar fotos
create policy "Party owners can create photos"
    on public.photos for insert
    with check (
        exists (
            select 1 from public.parties
            where parties.id = photos.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- Dono da festa pode atualizar fotos
create policy "Party owners can update photos"
    on public.photos for update
    using (
        exists (
            select 1 from public.parties
            where parties.id = photos.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- Dono da festa pode deletar fotos
create policy "Party owners can delete photos"
    on public.photos for delete
    using (
        exists (
            select 1 from public.parties
            where parties.id = photos.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- ============================================
-- POLÍTICAS: GIFTS
-- ============================================

-- Qualquer um pode ver presentes não comprados
create policy "Anyone can view available gifts"
    on public.gifts for select
    using (is_purchased = false or is_purchased is null);

-- Dono da festa pode ver todos os presentes
create policy "Party owners can view all gifts"
    on public.gifts for select
    using (
        exists (
            select 1 from public.parties
            where parties.id = gifts.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- Dono da festa pode criar presentes
create policy "Party owners can create gifts"
    on public.gifts for insert
    with check (
        exists (
            select 1 from public.parties
            where parties.id = gifts.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- Dono da festa pode atualizar presentes
create policy "Party owners can update gifts"
    on public.gifts for update
    using (
        exists (
            select 1 from public.parties
            where parties.id = gifts.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- Qualquer um pode atualizar para marcar como comprado (para RSVP público)
create policy "Anyone can mark gifts as purchased"
    on public.gifts for update
    using (is_purchased = false)
    with check (is_purchased = true);

-- Dono da festa pode deletar presentes
create policy "Party owners can delete gifts"
    on public.gifts for delete
    using (
        exists (
            select 1 from public.parties
            where parties.id = gifts.party_id
            and parties.owner_id = auth.uid()
        )
    );

-- ============================================
-- FUNÇÕES
-- ============================================

-- Função: Buscar convidado por código
create or replace function public.get_guest_by_code(input_code text)
returns table (
    id uuid,
    party_id uuid
) as $$
begin
    return query
    select g.id, g.party_id
    from public.guests g
    where g.code = input_code;
end;
$$ language plpgsql security definer;

-- Função: Buscar fotos por party_id e código de convidado
create or replace function public.get_photos(
    input_party_id uuid,
    input_guest_code text
)
returns table (
    id uuid,
    path text,
    caption text,
    author text
) as $$
begin
    -- Verifica se o código é válido para o party
    if exists (
        select 1 from public.guests
        where party_id = input_party_id
        and code = input_guest_code
    ) then
        return query
        select 
            p.id,
            p.path,
            p.caption,
            g.name as author
        from public.photos p
        left join public.guests g on p.guest_id = g.id
        where p.party_id = input_party_id
        and (p.is_public = true or p.is_approved = true);
    else
        -- Retorna apenas fotos públicas aprovadas
        return query
        select 
            p.id,
            p.path,
            p.caption,
            g.name as author
        from public.photos p
        left join public.guests g on p.guest_id = g.id
        where p.party_id = input_party_id
        and p.is_public = true 
        and p.is_approved = true;
    end if;
end;
$$ language plpgsql security definer;

-- Função: Gerar código único para convidado
create or replace function public.generate_guest_code()
returns text as $$
declare
    new_code text;
    code_exists boolean;
begin
    loop
        -- Gera código aleatório de 8 caracteres
        new_code := upper(substring(md5(random()::text), 1, 8));
        
        -- Verifica se já existe
        select exists(
            select 1 from public.guests where code = new_code
        ) into code_exists;
        
        -- Se não existe, retorna
        if not code_exists then
            return new_code;
        end if;
    end loop;
end;
$$ language plpgsql;

-- Trigger: Gerar código automaticamente ao inserir convidado
create or replace function public.set_guest_code()
returns trigger as $$
begin
    if new.code is null or new.code = '' then
        new.code := public.generate_guest_code();
    end if;
    return new;
end;
$$ language plpgsql;

drop trigger if exists trigger_set_guest_code on public.guests;
create trigger trigger_set_guest_code
    before insert on public.guests
    for each row
    execute function public.set_guest_code();

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Bucket para fotos dos eventos (criado via API ou dashboard)
--insert into storage.buckets (id, name, public)
--values ('event-photos', 'event-photos', false)
--on conflict do nothing;

-- ============================================
-- COMENTÁRIOS
-- ============================================

comment on table public.parties is 'Eventos/festas criados pelos usuários';
comment on table public.guests is 'Convidados dos eventos';
comment on table public.rsvps is 'Confirmações de presença';
comment on table public.photos is 'Fotos dos eventos';
comment on table public.gifts is 'Lista de presentes dos eventos';
