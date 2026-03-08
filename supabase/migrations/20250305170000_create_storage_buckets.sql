-- Migration: Storage Buckets
-- Description: Criação dos buckets de armazenamento para fotos e capas de eventos

-- ============================================
-- BUCKET: CAPAS DE EVENTOS (event-covers)
-- ============================================
-- Imagens de capa das festas (públicas)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'event-covers',
    'event-covers',
    true,
    5242880, -- 5MB
    array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do nothing;

-- ============================================
-- BUCKET: FOTOS DOS EVENTOS (event-photos)
-- ============================================
-- Fotos enviadas por convidados (privadas por padrão, acesso via código)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'event-photos',
    'event-photos',
    false,
    10485760, -- 10MB
    array['image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/heif']
)
on conflict (id) do nothing;

-- ============================================
-- BUCKET: AVATARES/PERFIS (avatars)
-- ============================================
-- Fotos de perfil dos usuários
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'avatars',
    'avatars',
    true,
    2097152, -- 2MB
    array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do nothing;

-- ============================================
-- POLÍTICAS: event-covers
-- ============================================

-- Política: Qualquer um pode ver capas (são públicas)
create policy "Public can view event covers"
on storage.objects for select
using (bucket_id = 'event-covers');

-- Política: Usuários autenticados podem fazer upload de capas
create policy "Authenticated users can upload event covers"
on storage.objects for insert
with check (
    bucket_id = 'event-covers'
    and auth.role() = 'authenticated'
);

-- Política: Donos podem atualizar suas capas
create policy "Users can update their event covers"
on storage.objects for update
using (
    bucket_id = 'event-covers'
    and auth.role() = 'authenticated'
    and (
        -- Extrai o party_id do path (formato: party_id/filename)
        exists (
            select 1 from public.parties
            where parties.id::text = (storage.foldername(name))[1]
            and parties.owner_id = auth.uid()
        )
    )
);

-- Política: Donos podem deletar suas capas
create policy "Users can delete their event covers"
on storage.objects for delete
using (
    bucket_id = 'event-covers'
    and auth.role() = 'authenticated'
    and (
        exists (
            select 1 from public.parties
            where parties.id::text = (storage.foldername(name))[1]
            and parties.owner_id = auth.uid()
        )
    )
);

-- ============================================
-- POLÍTICAS: event-photos
-- ============================================

-- Política: Qualquer um pode ver fotos aprovadas e públicas
create policy "Public can view approved event photos"
on storage.objects for select
using (
    bucket_id = 'event-photos'
    and (
        -- Verifica se a foto está marcada como pública/aprovada no banco
        exists (
            select 1 from public.photos
            where photos.path = storage.objects.name
            and photos.is_approved = true
        )
        or
        -- Ou se o path contém "public/"
        name like 'public/%'
    )
);

-- Política: Usuários autenticados podem fazer upload de fotos
create policy "Authenticated users can upload event photos"
on storage.objects for insert
with check (
    bucket_id = 'event-photos'
    and auth.role() = 'authenticated'
);

-- Política: Qualquer um pode fazer upload com código de convidado (para formulário público)
-- Nota: Isso será controlado pela aplicação via storage.upload com headers

create policy "Party owners can view all photos in their events"
on storage.objects for select
using (
    bucket_id = 'event-photos'
    and auth.role() = 'authenticated'
    and (
        exists (
            select 1 from public.parties
            join public.photos on photos.party_id = parties.id
            where photos.path = storage.objects.name
            and parties.owner_id = auth.uid()
        )
    )
);

-- Política: Donos podem deletar fotos de seus eventos
create policy "Party owners can delete event photos"
on storage.objects for delete
using (
    bucket_id = 'event-photos'
    and auth.role() = 'authenticated'
    and (
        exists (
            select 1 from public.parties
            join public.photos on photos.party_id = parties.id
            where photos.path = storage.objects.name
            and parties.owner_id = auth.uid()
        )
    )
);

-- ============================================
-- POLÍTICAS: avatars
-- ============================================

-- Política: Qualquer um pode ver avatares (são públicos)
create policy "Public can view avatars"
on storage.objects for select
using (bucket_id = 'avatars');

-- Política: Usuários podem fazer upload do próprio avatar
create policy "Users can upload their own avatar"
on storage.objects for insert
with check (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and name = auth.uid()::text || '.jpg'
);

-- Política: Usuários podem atualizar próprio avatar
create policy "Users can update their own avatar"
on storage.objects for update
using (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and name = auth.uid()::text || '.jpg'
);

-- Política: Usuários podem deletar próprio avatar
create policy "Users can delete their own avatar"
on storage.objects for delete
using (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and name = auth.uid()::text || '.jpg'
);

-- ============================================
-- COMENTÁRIOS (Storage buckets não suportam COMMENT)
-- ============================================
-- event-covers: Imagens de capa das festas (públicas, até 5MB)
-- event-photos: Fotos enviadas por convidados (privadas, até 10MB)
-- avatars: Fotos de perfil dos usuários (públicas, até 2MB)
