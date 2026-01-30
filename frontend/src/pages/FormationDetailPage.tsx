import { useParams, useNavigate } from 'react-router-dom';
import { FormationDetail } from '../components/FormationDetail';
import { useState, useEffect } from 'react';
import { trainingsApi, Training } from '../api/trainings.api';
import { Loader2 } from 'lucide-react';

export function FormationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formation, setFormation] = useState<Training | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    trainingsApi.getOne(id)
      .then(data => {
        setFormation(data);
      })
      .catch(err => {
        console.error('Error fetching formation:', err);
        navigate('/404');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-32 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-500">Chargement de la formation...</p>
      </div>
    );
  }

  if (!formation) {
    return null;
  }

  const handleBack = () => {
    navigate('/formations');
  };

  const handleClose = () => {
    navigate('/');
  };

  return <FormationDetail formation={formation} onBack={handleBack} onClose={handleClose} />;
}
