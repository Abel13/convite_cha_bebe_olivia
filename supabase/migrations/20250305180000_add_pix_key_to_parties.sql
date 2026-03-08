-- Migration: Add pix_key to parties table
-- Description: Adiciona coluna para chave Pix do evento (opcional, aceita NULL)

-- Adicionar coluna pix_key na tabela parties
-- NULL é permitido por padrão, permitindo que o usuário deixe em branco
alter table public.parties 
add column if not exists pix_key text null;

-- Comentário para documentação
comment on column public.parties.pix_key is 'Chave Pix para receber presentes em dinheiro (opcional)';

-- Atualizar a view de tipos do Supabase (se necessário)
-- Isso é feito automaticamente pelo Supabase quando a coluna é adicionada
