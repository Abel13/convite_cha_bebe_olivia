# 🗄️ Supabase - Configuração do Banco de Dados

Guia para configurar o banco de dados SaveThis.day no Supabase.

---

## 📁 Estrutura

```
supabase/
├── migrations/
│   └── 00000000000000_initial_schema.sql    # Schema inicial completo
├── seed.sql                                  # Dados de exemplo (opcional)
├── config.toml                              # Configuração do CLI
└── README.md                                # Este arquivo
```

---

## 🚀 Deploy no Supabase Remoto

### Opção 1: Via Supabase Dashboard (SQL Editor) - **Recomendado para iniciantes**

1. Acesse [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **SQL Editor** → **New query**
4. Copie o conteúdo do arquivo `migrations/00000000000000_initial_schema.sql`
5. Cole no editor e clique em **Run**

### Opção 2: Via Supabase CLI

#### Pré-requisitos
```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login
```

#### Linkar projeto existente
```bash
# Linkar com projeto remoto
supabase link --project-ref SEU_PROJECT_REF

# Verificar link
supabase status
```

> **Onde encontrar o Project Ref?**
> - No dashboard do Supabase: Settings → General → Project ID
> - Ou na URL do projeto: `https://supabase.com/dashboard/project/SEU_PROJECT_REF`

#### Executar migration
```bash
# Push das migrations para o banco remoto
supabase db push

# Se der erro de versão, force:
supabase db push --include-all
```

#### Resetar banco (cuidado!)
```bash
# Reseta e reaplica migrations + seed
supabase db reset --linked
```

---

## 📝 Atualizando o Schema

### Criar nova migration
```bash
# Criar arquivo de migration
supabase migration new nome_da_migration

# Exemplo:
supabase migration new add_gifts_table
```

Isso cria um arquivo em `supabase/migrations/` com timestamp.

### Aplicar migrations
```bash
# Localmente
supabase db reset

# Remotamente
supabase db push
```

---

## 🔄 Sincronizando mudanças do Dashboard

Se você fez alterações via SQL Editor no dashboard:

```bash
# Puxar mudanças do banco remoto
supabase db pull

# Isso cria uma nova migration com as alterações
```

---

## 🧪 Dados de Teste (Seed)

Para popular o banco com dados de exemplo:

```bash
# Executa o seed.sql após migrations
supabase db reset

# Ou manualmente via SQL Editor:
# Copie o conteúdo de seed.sql e execute no dashboard
```

**Antes de usar o seed.sql:**
1. Descomente as linhas desejadas
2. Substitua os UUIDs pelos valores reais do seu projeto
3. Crie um usuário via auth primeiro para obter o UUID

---

## 📊 Estrutura do Banco

### Tabelas

| Tabela | Descrição | Principais Campos |
|--------|-----------|-------------------|
| `parties` | Eventos/Festas | name, slug, date, owner_id |
| `guests` | Convidados | name, code (único), party_id |
| `rsvps` | Confirmações | adults, children, party_id |
| `photos` | Fotos | path, is_public, is_approved |
| `gifts` | Lista de presentes | price, is_purchased |

### Relacionamentos
```
auth.users (1) ───< (N) parties
parties (1) ───< (N) guests
parties (1) ───< (N) rsvps
parties (1) ───< (N) photos
parties (1) ───< (N) gifts
guests (1) ───< (N) photos (opcional)
```

---

## 🔐 Políticas RLS (Row Level Security)

Todas as tabelas têm RLS habilitado com as seguintes regras:

- **Dono da festa**: Pode ler, criar, atualizar e deletar tudo relacionado às suas festas
- **Público**: Pode ver festas públicas, criar RSVPs, ver presentes disponíveis
- **Convidados com código**: Podem ver fotos privadas aprovadas do evento

---

## 🛠️ Comandos Úteis

```bash
# Iniciar Supabase localmente
supabase start

# Parar
supabase stop

# Status
supabase status

# Logs
supabase logs postgres

# Backup do schema
supabase db dump -f backup.sql

# Diff entre local e remoto
supabase db diff --linked
```

---

## ❌ Troubleshooting

### Erro: "Version mismatch"
```bash
# Forçar push ignorando versão
supabase db push --include-all
```

### Erro: "Permission denied"
Verifique se as políticas RLS estão configuradas corretamente.

### Erro: "Table does not exist"
Certifique-se de que a migration foi aplicada:
```bash
supabase db push
```

### Erro: "Cannot read properties of undefined"
Verifique se o `config.toml` está correto e o projeto está linkado:
```bash
supabase status
```

---

## 📚 Recursos

- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- [Database Migrations](https://supabase.com/docs/guides/database/migrations)
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
