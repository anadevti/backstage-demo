import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
  Button,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  IconButton,
  CircularProgress as Progress
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

interface Team {
  id: string;
  name: string;
}

interface PagerDutyAlert {
  id: string;
  summary: string;
  status: string;
  team?: Team;
  teams?: Team[];
  created_at: string;
  incident_key?: string;
  last_status_change_at?: string;
  urgency?: string;
}

interface OnCallPerson {
  id: string;
  name: string;
}

export const Notifications = () => {
  const [alerts, setAlerts] = useState<PagerDutyAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openOnly, setOpenOnly] = useState(false);
  const [closedOnly, setClosedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [onCallPersons, setOnCallPersons] = useState<OnCallPerson[]>([]);
  const [onCallLoading, setOnCallLoading] = useState(true);
  const [onCallError, setOnCallError] = useState<string | null>(null);

  const fetchAlerts = () => {
    setLoading(true);
    fetch('https://api.pagerduty.com/incidents', {
      headers: {
        'Authorization': `Token token=TOKEN_PD`,
        'Accept': 'application/vnd.pagerduty+json;version=2',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar alertas do PagerDuty');
        }
        return response.json();
      })
      .then((data: { incidents: PagerDutyAlert[] }) => {
        setAlerts(data.incidents);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchOnCallPersons = () => {
    setOnCallLoading(true);
    fetch('https://api.pagerduty.com/oncalls', {
      headers: {
        'Authorization': `Token token=TOKEN_ONCALL_PD`,
        'Accept': 'application/vnd.pagerduty+json;version=2',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar pessoas oncall');
        }
        return response.json();
      })
      .then((data: { oncalls: any[] }) => {
        const persons = data.oncalls
          .map(item => ({
            id: item.user?.id,
            name: item.user?.summary
          }))
          .filter(person => person.id && person.name);
        setOnCallPersons(persons);
        setOnCallLoading(false);
      })
      .catch((err: Error) => {
        setOnCallError(err.message);
        setOnCallLoading(false);
      });
  };

  useEffect(() => {
    fetchAlerts();
    fetchOnCallPersons();
    const alertInterval = setInterval(() => {
      fetchAlerts();
    }, 15000);
    const onCallInterval = setInterval(() => {
      fetchOnCallPersons();
    }, 15000);

    return () => {
      clearInterval(alertInterval);
      clearInterval(onCallInterval);
    };
  }, []);

  const getAlertUrl = (alert: PagerDutyAlert) => {
    return `https://pagerduty.com/incidents/${alert.id}`;
  };

  // Ordena os alertas por data de criação (crescente)
  const sortedAlerts = [...alerts].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  // Filtro de incidentes baseado no status e no resumo
  let filteredAlerts = sortedAlerts.filter(alert => {
    const isOpen = alert.status === 'open' || alert.status === 'triggered';
    // Aplica os filtros de status:
    if (openOnly && !closedOnly && !isOpen) return false;
    if (closedOnly && !openOnly && isOpen) return false;
    // Se ambos estiverem marcados ou nenhum, não filtra por status

    // Filtro de resumo
    if (searchQuery && !alert.summary.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Dashboard de Taxa de Incidentes: calcula quantos incidentes estão abertos e encerrados.
  const totalCount = alerts.length;
  const openCount = alerts.filter(alert => alert.status === 'open' || alert.status === 'triggered').length;
  const closedCount = totalCount - openCount;
  const openRate = totalCount > 0 ? Math.round((openCount / totalCount) * 100) : 0;
  const closedRate = totalCount > 0 ? Math.round((closedCount / totalCount) * 100) : 0;

  const handleRefresh = () => {
    fetchAlerts();
    fetchOnCallPersons();
  };

  return (
    <Card style={{ margin: '2rem', padding: '1rem' }}>
      <CardContent>
        {/* Cabeçalho com título e botão de atualização */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" gutterBottom>
              Dashboard de Incidentes e Pessoas OnCall
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Seção de Pessoas OnCall */}
        <Typography variant="h6" gutterBottom>
          Pessoas OnCall
        </Typography>
        {onCallLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <CircularProgress size={20} style={{ marginRight: '0.5rem' }} />
            <Typography>Carregando pessoas oncall...</Typography>
          </div>
        ) : onCallError ? (
          <Typography color="error">
            Erro ao carregar pessoas oncall: {onCallError}
          </Typography>
        ) : onCallPersons.length === 0 ? (
          <Typography>Nenhuma pessoa oncall encontrada.</Typography>
        ) : (
          <Grid container spacing={2} style={{ marginBottom: '1rem' }}>
            {onCallPersons.map(person => (
              <Grid item key={person.id}>
                <Button variant="outlined">{person.name}</Button>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Seção de Filtros de Incidentes */}
        <Typography variant="h6" gutterBottom>
          Filtros de Incidentes
        </Typography>
        <Grid container spacing={2} style={{ marginBottom: '1rem' }}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={openOnly}
                  onChange={(e) => setOpenOnly(e.target.checked)}
                  color="primary"
                />
              }
              label="Apenas incidentes abertos"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={closedOnly}
                  onChange={(e) => setClosedOnly(e.target.checked)}
                  color="primary"
                />
              }
              label="Apenas incidentes fechados"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Buscar por resumo"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Seção do Dashboard de Taxa de Incidentes */}
        <Typography variant="h6" gutterBottom>
          Dashboard de Taxa de Incidentes
        </Typography>
        <Grid container spacing={2} style={{ marginBottom: '1rem' }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Incidentes Abertos: {openCount} ({openRate}%)
            </Typography>
            <CircularProgress variant="determinate" value={openRate} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Incidentes Encerrados: {closedCount} ({closedRate}%)
            </Typography>
            <CircularProgress  variant="determinate" value={closedRate} />
          </Grid>
        </Grid>

       {/* Seção de Timeline de Incidentes */}
<Typography variant="h6" gutterBottom>
  Timeline de Incidentes
</Typography>
{loading ? (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <CircularProgress style={{ marginRight: '1rem' }} />
    <Typography>Carregando alertas...</Typography>
  </div>
) : error ? (
  <Typography color="error">
    Erro ao carregar alertas: {error}
  </Typography>
) : filteredAlerts.length === 0 ? (
  <Typography>Sem incidentes para exibir.</Typography>
) : (
  <Grid container spacing={2}>
    {filteredAlerts.map(alert => (
      <Grid item xs={12} sm={6} md={4} key={alert.id}>
        <Alert
          severity={
            alert.status === 'open' || alert.status === 'triggered'
              ? 'warning'
              : 'success'
          }
          style={{ height: '100%' }}
        >
          <AlertTitle>{alert.summary}</AlertTitle>
          <Typography variant="body2">
            Status: {alert.status}
          </Typography>
          {alert.incident_key && (
            <Typography variant="body2">
              Chave: {alert.incident_key}
            </Typography>
          )}
          {alert.urgency && (
            <Typography variant="body2">
              Urgência: {alert.urgency}
            </Typography>
          )}
          {alert.last_status_change_at && (
            <Typography variant="body2">
              Última Atualização: {new Date(alert.last_status_change_at).toLocaleString()}
            </Typography>
          )}
          {alert.team ? (
            <Typography variant="caption" display="block">
              Equipe: {alert.team.name}
            </Typography>
          ) : alert.teams ? (
            <Typography variant="caption" display="block">
              Equipes: {alert.teams.map(t => t.name).join(', ')}
            </Typography>
          ) : null}
          <Typography variant="caption" display="block">
            Criado em: {new Date(alert.created_at).toLocaleString()}
          </Typography>
          <div style={{ marginTop: '0.5rem' }}>
            <Button
              variant="outlined"
              size="small"
              href={getAlertUrl(alert)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Alerta
            </Button>
          </div>
        </Alert>
      </Grid>
    ))}
  </Grid>
)}
      </CardContent>
    </Card>
  );
} 