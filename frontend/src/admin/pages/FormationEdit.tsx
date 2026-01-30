import { motion } from 'motion/react';
import { ArrowLeft, Save, ImagePlus, X, Plus, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trainingsApi, Training } from '../../api/trainings.api';
import { categoriesApi, Category } from '../../api/categories.api';

interface Module {
  moduleName: string;
  topics: string[];
}

export function FormationEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Basic Information
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('Tous niveaux');
  const [description, setDescription] = useState('');

  // Media
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  // Details
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);

  // Content
  const [modules, setModules] = useState<Module[]>([]);
  const [program, setProgram] = useState('');

  // Instructor
  const [instructorName, setInstructorName] = useState('');
  const [instructorTitle, setInstructorTitle] = useState('');
  const [instructorDescription, setInstructorDescription] = useState('');
  const [instructorPhotoFile, setInstructorPhotoFile] = useState<File | null>(null);
  const [instructorPhotoPreview, setInstructorPhotoPreview] = useState<string | null>(null);
  const [existingInstructorPhoto, setExistingInstructorPhoto] = useState<string | null>(null);

  // Visibility
  const [isActive, setIsActive] = useState(true);

  // States
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [trainingData, categoriesData] = await Promise.all([
          trainingsApi.getOne(id),
          categoriesApi.getAll()
        ]);

        setCategories(categoriesData);

        // Fill form
        setTitle(trainingData.title);
        setCategory(typeof trainingData.category === 'object' ? (trainingData.category as any).name : trainingData.category);
        setDescription(trainingData.description);
        setPrice(trainingData.price);
        setDiscount(trainingData.discount || 0);
        setHours(trainingData.hours);
        setProgram(trainingData.program || '');
        setModules(trainingData.modules || []);
        setInstructorName(trainingData.instructorName || trainingData.instructor || '');
        setInstructorTitle(trainingData.instructorTitle || '');
        setInstructorDescription(trainingData.instructorDescription || '');
        setIsActive(trainingData.isActive);
        setLevel(trainingData.level || 'Tous niveaux');
        setExistingImage(trainingData.image || null);
        setExistingInstructorPhoto(trainingData.instructorPhoto || null);

      } catch (err: any) {
        setError(err.message || 'Impossible de charger la formation');
      } finally {
        setIsDataLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'training' | 'instructor') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'training') {
          setImageFile(file);
          setImagePreview(reader.result as string);
        } else {
          setInstructorPhotoFile(file);
          setInstructorPhotoPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddModule = () => {
    setModules([...modules, { moduleName: '', topics: [''] }]);
  };

  const handleRemoveModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const handleModuleChange = (index: number, value: string) => {
    const updatedModules = [...modules];
    updatedModules[index].moduleName = value;
    setModules(updatedModules);
  };

  const handleAddTopic = (moduleIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].topics.push('');
    setModules(updatedModules);
  };

  const handleRemoveTopic = (moduleIndex: number, topicIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].topics = updatedModules[moduleIndex].topics.filter((_, i) => i !== topicIndex);
    setModules(updatedModules);
  };

  const handleTopicChange = (moduleIndex: number, topicIndex: number, value: string) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].topics[topicIndex] = value;
    setModules(updatedModules);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('level', level);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('discount', discount.toString());
    formData.append('hours', hours.toString());
    formData.append('program', program);
    formData.append('instructorName', instructorName);
    formData.append('instructorTitle', instructorTitle);
    formData.append('instructorDescription', instructorDescription);
    formData.append('isActive', isActive.toString());
    formData.append('modules', JSON.stringify(modules));

    if (imageFile) formData.append('image', imageFile);
    if (instructorPhotoFile) formData.append('instructorPhoto', instructorPhotoFile);

    try {
      await trainingsApi.update(id, formData);
      navigate('/admin/formations');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la mise à jour');
      setIsLoading(false);
    }
  };

  if (isDataLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-600">Chargement de la formation...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <motion.button
          onClick={() => navigate('/admin/formations')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Modifier la formation</h1>
          <p className="text-gray-600">{title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pb-20">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Basic Information */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de base</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut *</label>
                <select
                  value={isActive ? 'active' : 'inactive'}
                  onChange={(e) => setIsActive(e.target.value === 'active')}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Niveau *</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
              >
                <option value="Tous niveaux">Tous niveaux</option>
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Image de formation</h2>
            <div className="space-y-4">
              <div
                className="aspect-video w-full rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50 group hover:border-pink-500 transition-colors cursor-pointer"
                onClick={() => document.getElementById('training-image')?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : existingImage ? (
                  <img src={existingImage.startsWith('http') ? existingImage : `https://api.mon-espace.msit-demo.fr${existingImage}`} alt="Existing" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImagePlus className="w-12 h-12 text-gray-400 group-hover:text-pink-500" />
                    <p className="mt-2 text-sm text-gray-500">Cliquez pour modifier l'image</p>
                  </>
                )}
                <input
                  id="training-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, 'training')}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo instructeur</h2>
            <div className="space-y-4">
              <div
                className="aspect-square w-32 mx-auto rounded-full border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50 group hover:border-pink-500 transition-colors cursor-pointer"
                onClick={() => document.getElementById('instructor-photo')?.click()}
              >
                {instructorPhotoPreview ? (
                  <img src={instructorPhotoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : existingInstructorPhoto ? (
                  <img src={existingInstructorPhoto.startsWith('http') ? existingInstructorPhoto : `https://api.mon-espace.msit-demo.fr${existingInstructorPhoto}`} alt="Existing" className="w-full h-full object-cover" />
                ) : (
                  <Plus className="w-8 h-8 text-gray-400 group-hover:text-pink-500" />
                )}
                <input
                  id="instructor-photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, 'instructor')}
                />
              </div>
              <p className="text-center text-sm text-gray-500">Photo de profil de l'instructeur</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tarification et durée</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prix (€) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Réduction (€)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre d'heures *</label>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                required
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Instructor */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructeur</h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'instructeur *</label>
                <input
                  type="text"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'instructeur</label>
                <input
                  type="text"
                  value={instructorTitle}
                  onChange={(e) => setInstructorTitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio instructeur</label>
              <textarea
                value={instructorDescription}
                onChange={(e) => setInstructorDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Program */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Programme par modules</h2>
            <button
              type="button"
              onClick={handleAddModule}
              className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter un module
            </button>
          </div>
          <div className="space-y-6">
            {modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="border-2 border-gray-200 rounded-xl p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Titre du module</label>
                    <input
                      type="text"
                      value={module.moduleName}
                      onChange={(e) => handleModuleChange(moduleIndex, e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none font-bold"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveModule(moduleIndex)}
                    className="mt-6 text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Sujets abordés</label>
                  {module.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => handleTopicChange(moduleIndex, topicIndex, e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveTopic(moduleIndex, topicIndex)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddTopic(moduleIndex)}
                    className="text-sm text-pink-500 hover:text-pink-600 font-medium"
                  >
                    + Ajouter un sujet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Program */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Aperçu du programme</h2>
          <textarea
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
          />
        </div>

        {/* Submit Buttons */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 z-10">
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border-2 border-gray-200 shadow-xl flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/formations')}
              disabled={isLoading}
              className="flex-1 px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium disabled:opacity-50"
            >
              Annuler
            </button>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-4 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors font-medium flex items-center justify-center gap-2 shadow-lg shadow-pink-200 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
              {isLoading ? 'Mise à jour en cours...' : 'Mettre à jour la formation'}
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}
