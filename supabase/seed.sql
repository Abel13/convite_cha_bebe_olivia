-- Seed: Dados iniciais para desenvolvimento
-- Este arquivo é executado automaticamente após as migrations

-- ============================================
-- DADOS DE EXEMPLO (para desenvolvimento)
-- Descomente se quiser dados iniciais no banco
-- ============================================

-- -- Usuário de teste (crie via auth do Supabase e substitua o UUID)
-- -- insert into auth.users (id, email, raw_user_meta_data)
-- -- values (
-- --     '00000000-0000-0000-0000-000000000001',
-- --     'teste@exemplo.com',
-- --     '{"name": "Usuário Teste"}'::jsonb
-- -- );

-- -- Festa de exemplo
-- insert into public.parties (
--     id, name, slug, date, location, description, owner_id, theme_color
-- ) values (
--     '11111111-1111-1111-1111-111111111111',
--     'Chá de Bebê da Olivia',
--     'cha-de-bebe-olivia',
--     '2026-06-15 14:00:00+00',
--     'Rua das Flores, 123 - São Paulo, SP',
--     'Venha celebrar a chegada da nossa princesa! Teremos chá, bolos e muita diversão.',
--     '00000000-0000-0000-0000-000000000001',
--     '#EC4899'
-- );

-- -- Convidados de exemplo
-- insert into public.guests (party_id, name, contact, note) values
--     ('11111111-1111-1111-1111-111111111111', 'Maria Silva', 'maria@email.com', 'Irmã da mamãe'),
--     ('11111111-1111-1111-1111-111111111111', 'João Santos', '(11) 98765-4321', 'Amigo do trabalho'),
--     ('11111111-1111-1111-1111-111111111111', 'Ana Oliveira', 'ana@email.com', 'Vizinha'),
--     ('11111111-1111-1111-1111-111111111111', 'Carlos Pereira', '(11) 91234-5678', 'Tio do papai');

-- -- RSVPs de exemplo
-- insert into public.rsvps (party_id, name, contact, adults, children, message) values
--     ('11111111-1111-1111-1111-111111111111', 'Maria Silva', 'maria@email.com', 2, 1, 'Mal posso esperar para conhecer a Olivia!'),
--     ('11111111-1111-1111-1111-111111111111', 'João Santos', '(11) 98765-4321', 1, 0, 'Vou levar um presente especial!');

-- -- Presentes de exemplo
-- insert into public.gifts (party_id, name, description, price, priority) values
--     ('11111111-1111-1111-1111-111111111111', 'Fraldas Pampers P', 'Pacote com 50 unidades', 45.90, 1),
--     ('11111111-1111-1111-1111-111111111111', 'Kit Higiene', 'Shampoo, sabonete e creme', 89.90, 2),
--     ('11111111-1111-1111-1111-111111111111', 'Berço Portátil', 'Para viagens', 299.90, 3),
--     ('11111111-1111-1111-1111-111111111111', 'Contribuição em Dinheiro', 'Para o enxoval', null, 1);
