import React from 'react';
import { useNavigate } from 'react-router-dom';

const Uitleg: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Typen Validiteit & Betrouwbaarheid</h1>
      
      {/* Illustratie */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Visuele Uitleg</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAFZElEQVR4nO2dW2gcVRjH/99s1l6STbexNZW2PlQUFVEQodaL9MGLFa2ggg/6oCiI4IsXfBAFQcEHCz4pKCjoQ1VQEC+gVBRExYJ4qViwmkutNsVek9pNdrOZ+XzIJrO7c87snDNnZjbnB/Owd853vv3/z5wzs7tzDqBQKBQKhUKhUCgUCoVCoVAoFArF2oVpHXieNw7gBgC7AGwDMAFgI4AxAOMARrXBKQBLALIACgAWAZwBcBLAFwA+BfBZEARzWuPWCmqA4zjbATwM4D4Au2scxgkA7wF4NQiCkzWOZZyaA3Ec5yEATwHYXstYEfwA4JkgCN6oQ6ya4XkeSZLkeZ7XiHV5nvcaSc/zvFQtY9YkQY7j3AXgDQBbahGvSn4B8EgQBG/VOK4xTCfIcZw9AN4GsN5krDrxD4B7giD4oFZBjSXIcZy9AN4BkDIVo0HkAdwdBMH7tQhmJEGO49wM4D0AaRMxmkQRwF1BEHxkOpBp7XsawAE0t3kAkATwtuM4N5kOZDRBjuM8COA+kzFWCRsAvOM4zohJY8YS5DjOVgAvmrK3StkO4GWTBk1+QjxP0vhE0OxsIxm7JEmvMvhpTpLMkHyW5FiV/ayGdTvJH0kGJI+R3F2tIeOfkCiKngGwpUqbzwO4HcBvJO8neRnJZ6q01VKQvJTkYySPAzgM4EoAT1Zry6SBCQA7Adxahc0EgKkgCI6RBMmXADzuOM5kFfZaDpKTQRB8CgAkXwXwZDU2TCbocgBjVdi7OAiCL8o7giD4zXGc1wE8bsBeS0LyzyAIPgcAkicAnKvGjkkDWwCMVmFvZ8z+PQB+N2CvVSF5Ycz+ySrtGKMtxFQQBGdFu0EQzDuO8xOAK+oVs4X4k+QZg3aMJeigQVvTMfsvBbDOoN1W4xDJvEE7ZhJEcprkNEkTFw5nx+zfCOBvA3ZbFpJZkt8atGUuQQCyAN42ZGtuzP44gD8M2G1lPiB5zpAtowkiuQDgTUP25uN2kjxuyG4r8oUhO+YTBIDkQQC/GjJ3YbwjCIIigK8N2W4pSM6TPGzIVm0SRDIP4DUT9kguAHhftBMEwSyAbwzYbzVmSJ4yZKt2CQIA8iUAp6u1Q/JgEARxF4nvVmu/BXnPlHGT91NWQXI/gIeqtUPy7Zj9ewH8Wq39FuNnkp+ZMlbzBJE8QPI+AFUNPkn+SPKL8h0kC1B3WEV8bNJYPa4U30Ly+WoMkJwlOROzfxrAP9XEaEG+NWmsnldrd5N8oQr9eZKvxO0kuUjyULUxWoxjJo3V+34IyQDAvY7jvA/gGQBXV2hiAcDbQRB8F3eQ5AGSHzqOswvAjQB2ANgEYBLAOgAdADoBlN5KLAAokswBmANwHsA0gFMAjgL4CMBMEARFlX4TKBQKhUKhUCgUCoVCoVAoFAqFQtFM2OJAz/M2AJgCsBHAOIBuVH6bvghgHkAGwDkApwGcDIJgvhbBPc/rArAZwBYU+9oHYBTFvqYApFDs6ziKfZ0jeYrkqSAIFmsRr1VIAbgawA0ArgOwE8WE9FZhM0MyS/IcgD8AHAPwJYCvgiCYNRjb87wEgG0ArgVwHYrJ2IbiF0RfX4skF0hmUOzrMQBfA/gsCIKTBmO3HKMA7gBwN4BdALpqHG8JwI8A3gXwThAEv9QqkOd5WwHcCuBOANejvn39BsD7AN4NgmC6VrGajQ4U3/EHAMzW+d9+HsCrAK40/Up5nrcewH4U3/mzde7rAoD/APwXBMGZ+A5aB8/z9pF8k+SZBhsv5xTJZ0n2m+6P53m9JJ8ieaLBfS3nLMm3SO6tqq8KhUKhUCgUCkVz8z9YD0RfvjgxIQAAAABJRU5ErkJggg==" 
                alt="Onbetrouwbaar & niet valide" 
                className="mx-auto mb-2"
              />
              <p className="font-medium">Onbetrouwbaar & niet valide</p>
              <p className="text-gray-600">Verspreide punten, verkeerd doel</p>
            </div>
            <div className="text-center">
              <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAFZElEQVR4nO2dW2gcVRjH/99s1l6STbexNZW2PlQUFVEQodaL9MGLFa2ggg/6oCiI4IsXfBAFQcEHCz4pKCjoQ1VQEC+gVBRExYJ4qViwmkutNsVek9pNdrOZ+XzIJrO7c87snDNnZjbnB/Owd853vv3/z5wzs7tzDqBQKBQKhUKhUCgUCoVCoVAoFArF2oVpHXieNw7gBgC7AGwDMAFgI4AxAOMARrXBKQBLALIACgAWAZwBcBLAFwA+BfBZEARzWuPWCmqA4zjbATwM4D4Au2scxgkA7wF4NQiCkzWOZZyaA3Ec5yEATwHYXstYEfwA4JkgCN6oQ6ya4XkeSZLkeZ7XiHV5nvcaSc/zvFQtY9YkQY7j3AXgDQBbahGvSn4B8EgQBG/VOK4xTCfIcZw9AN4GsN5krDrxD4B7giD4oFZBjSXIcZy9AN4BkDIVo0HkAdwdBMH7tQhmJEGO49wM4D0AaRMxmkQRwF1BEHxkOpBp7XsawAE0t3kAkATwtuM4N5kOZDRBjuM8COA+kzFWCRsAvOM4zohJY8YS5DjOVgAvmrK3StkO4GWTBk1+QjxP0vhE0OxsIxm7JEmvMvhpTpLMkHyW5FiV/ayGdTvJH0kGJI+R3F2tIeOfkCiKngGwpUqbzwO4HcBvJO8neRnJZ6q01VKQvJTkYySPAzgM4EoAT1Zry6SBCQA7Adxahc0EgKkgCI6RBMmXADzuOM5kFfZaDpKTQRB8CgAkXwXwZDU2TCbocgBjVdi7OAiCL8o7giD4zXGc1wE8bsBeS0LyzyAIPgcAkicAnKvGjkkDWwCMVmFvZ8z+PQB+N2CvVSF5Ycz+ySrtGKMtxFQQBGdFu0EQzDuO8xOAK+oVs4X4k+QZg3aMJeigQVvTMfsvBbDOoN1W4xDJvEE7ZhJEcprkNEkTFw5nx+zfCOBvA3ZbFpJZkt8atGUuQQCyAN42ZGtuzP44gD8M2G1lPiB5zpAtowkiuQDgTUP25uN2kjxuyG4r8oUhO+YTBIDkQQC/GjJ3YbwjCIIigK8N2W4pSM6TPGzIVm0SRDIP4DUT9kguAHhftBMEwSyAbwzYbzVmSJ4yZKt2CQIA8iUAp6u1Q/JgEARxF4nvVmu/BXnPlHGT91NWQXI/gIeqtUPy7Zj9ewH8Wq39FuNnkp+ZMlbzBJE8QPI+AFUNPkn+SPKL8h0kC1B3WEV8bNJYPa4U30Ly+WoMkJwlOROzfxrAP9XEaEG+NWmsnldrd5N8oQr9eZKvxO0kuUjyULUxWoxjJo3V+34IyQDAvY7jvA/gGQBXV2hiAcDbQRB8F3eQ5AGSHzqOswvAjQB2ANgEYBLAOgAdADoBlN5KLAAokswBmANwHsA0gFMAjgL4CMBMEARFlX4TKBQKhUKhUCgUCoVCoVAoFAqFQtFM2OJAz/M2AJgCsBHAOIBuVH6bvghgHkAGwDkApwGcDIJgvhbBPc/rArAZwBYU+9oHYBTFvqYApFDs6ziKfZ0jeYrkqSAIFmsRr1VIAbgawA0ArgOwE8WE9FZhM0MyS/IcgD8AHAPwJYCvgiCYNRjb87wEgG0ArgVwHYrJ2IbiF0RfX4skF0hmUOzrMQBfA/gsCIKTBmO3HKMA7gBwN4BdALpqHG8JwI8A3gXwThAEv9QqkOd5WwHcCuBOANejvn39BsD7AN4NgmC6VrGajQ4U3/EHAMzW+d9+HsCrAK40/Up5nrcewH4U3/mzde7rAoD/APwXBMGZ+A5aB8/z9pF8k+SZBhsv5xTJZ0n2m+6P53m9JJ8ieaLBfS3nLMm3SO6tqq8KhUKhUCgUCkVz8z9YD0RfvjgxIQAAAABJRU5ErkJggg==" 
                alt="Onbetrouwbaar maar wel valide" 
                className="mx-auto mb-2"
              />
              <p className="font-medium">Onbetrouwbaar maar wel valide</p>
              <p className="text-gray-600">Verspreide punten, juist doel</p>
            </div>
            <div className="text-center">
              <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAFZElEQVR4nO2dW2gcVRjH/99s1l6STbexNZW2PlQUFVEQodaL9MGLFa2ggg/6oCiI4IsXfBAFQcEHCz4pKCjoQ1VQEC+gVBRExYJ4qViwmkutNsVek9pNdrOZ+XzIJrO7c87snDNnZjbnB/Owd853vv3/z5wzs7tzDqBQKBQKhUKhUCgUCoVCoVAoFArF2oVpHXieNw7gBgC7AGwDMAFgI4AxAOMARrXBKQBLALIACgAWAZwBcBLAFwA+BfBZEARzWuPWCmqA4zjbATwM4D4Au2scxgkA7wF4NQiCkzWOZZyaA3Ec5yEATwHYXstYEfwA4JkgCN6oQ6ya4XkeSZLkeZ7XiHV5nvcaSc/zvFQtY9YkQY7j3AXgDQBbahGvSn4B8EgQBG/VOK4xTCfIcZw9AN4GsN5krDrxD4B7giD4oFZBjSXIcZy9AN4BkDIVo0HkAdwdBMH7tQhmJEGO49wM4D0AaRMxmkQRwF1BEHxkOpBp7XsawAE0t3kAkATwtuM4N5kOZDRBjuM8COA+kzFWCRsAvOM4zohJY8YS5DjOVgAvmrK3StkO4GWTBk1+QjxP0vhE0OxsIxm7JEmvMvhpTpLMkHyW5FiV/ayGdTvJH0kGJI+R3F2tIeOfkCiKngGwpUqbzwO4HcBvJO8neRnJZ6q01VKQvJTkYySPAzgM4EoAT1Zry6SBCQA7Adxahc0EgKkgCI6RBMmXADzuOM5kFfZaDpKTQRB8CgAkXwXwZDU2TCbocgBjVdi7OAiCL8o7giD4zXGc1wE8bsBeS0LyzyAIPgcAkicAnKvGjkkDWwCMVmFvZ8z+PQB+N2CvVSF5Ycz+ySrtGKMtxFQQBGdFu0EQzDuO8xOAK+oVs4X4k+QZg3aMJeigQVvTMfsvBbDOoN1W4xDJvEE7ZhJEcprkNEkTFw5nx+zfCOBvA3ZbFpJZkt8atGUuQQCyAN42ZGtuzP44gD8M2G1lPiB5zpAtowkiuQDgTUP25uN2kjxuyG4r8oUhO+YTBIDkQQC/GjJ3YbwjCIIigK8N2W4pSM6TPGzIVm0SRDIP4DUT9kguAHhftBMEwSyAbwzYbzVmSJ4yZKt2CQIA8iUAp6u1Q/JgEARxF4nvVmu/BXnPlHGT91NWQXI/gIeqtUPy7Zj9ewH8Wq39FuNnkp+ZMlbzBJE8QPI+AFUNPkn+SPKL8h0kC1B3WEV8bNJYPa4U30Ly+WoMkJwlOROzfxrAP9XEaEG+NWmsnldrd5N8oQr9eZKvxO0kuUjyULUxWoxjJo3V+34IyQDAvY7jvA/gGQBXV2hiAcDbQRB8F3eQ5AGSHzqOswvAjQB2ANgEYBLAOgAdADoBlN5KLAAokswBmANwHsA0gFMAjgL4CMBMEARFlX4TKBQKhUKhUCgUCoVCoVAoFAqFQtFM2OJAz/M2AJgCsBHAOIBuVH6bvghgHkAGwDkApwGcDIJgvhbBPc/rArAZwBYU+9oHYBTFvqYApFDs6ziKfZ0jeYrkqSAIFmsRr1VIAbgawA0ArgOwE8WE9FZhM0MyS/IcgD8AHAPwJYCvgiCYNRjb87wEgG0ArgVwHYrJ2IbiF0RfX4skF0hmUOzrMQBfA/gsCIKTBmO3HKMA7gBwN4BdALpqHG8JwI8A3gXwThAEv9QqkOd5WwHcCuBOANejvn39BsD7AN4NgmC6VrGajQ4U3/EHAMzW+d9+HsCrAK40/Up5nrcewH4U3/mzde7rAoD/APwXBMGZ+A5aB8/z9pF8k+SZBhsv5xTJZ0n2m+6P53m9JJ8ieaLBfS3nLMm3SO6tqq8KhUKhUCgUCkVz8z9YD0RfvjgxIQAAAABJRU5ErkJggg==" 
                alt="Betrouwbaar maar niet valide" 
                className="mx-auto mb-2"
              />
              <p className="font-medium">Betrouwbaar maar niet valide</p>
              <p className="text-gray-600">Gegroepeerde punten, verkeerd doel</p>
            </div>
            <div className="text-center">
              <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAFZElEQVR4nO2dW2gcVRjH/99s1l6STbexNZW2PlQUFVEQodaL9MGLFa2ggg/6oCiI4IsXfBAFQcEHCz4pKCjoQ1VQEC+gVBRExYJ4qViwmkutNsVek9pNdrOZ+XzIJrO7c87snDNnZjbnB/Owd853vv3/z5wzs7tzDqBQKBQKhUKhUCgUCoVCoVAoFArF2oVpHXieNw7gBgC7AGwDMAFgI4AxAOMARrXBKQBLALIACgAWAZwBcBLAFwA+BfBZEARzWuPWCmqA4zjbATwM4D4Au2scxgkA7wF4NQiCkzWOZZyaA3Ec5yEATwHYXstYEfwA4JkgCN6oQ6ya4XkeSZLkeZ7XiHV5nvcaSc/zvFQtY9YkQY7j3AXgDQBbahGvSn4B8EgQBG/VOK4xTCfIcZw9AN4GsN5krDrxD4B7giD4oFZBjSXIcZy9AN4BkDIVo0HkAdwdBMH7tQhmJEGO49wM4D0AaRMxmkQRwF1BEHxkOpBp7XsawAE0t3kAkATwtuM4N5kOZDRBjuM8COA+kzFWCRsAvOM4zohJY8YS5DjOVgAvmrK3StkO4GWTBk1+QjxP0vhE0OxsIxm7JEmvMvhpTpLMkHyW5FiV/ayGdTvJH0kGJI+R3F2tIeOfkCiKngGwpUqbzwO4HcBvJO8neRnJZ6q01VKQvJTkYySPAzgM4EoAT1Zry6SBCQA7Adxahc0EgKkgCI6RBMmXADzuOM5kFfZaDpKTQRB8CgAkXwXwZDU2TCbocgBjVdi7OAiCL8o7giD4zXGc1wE8bsBeS0LyzyAIPgcAkicAnKvGjkkDWwCMVmFvZ8z+PQB+N2CvVSF5Ycz+ySrtGKMtxFQQBGdFu0EQzDuO8xOAK+oVs4X4k+QZg3aMJeigQVvTMfsvBbDOoN1W4xDJvEE7ZhJEcprkNEkTFw5nx+zfCOBvA3ZbFpJZkt8atGUuQQCyAN42ZGtuzP44gD8M2G1lPiB5zpAtowkiuQDgTUP25uN2kjxuyG4r8oUhO+YTBIDkQQC/GjJ3YbwjCIIigK8N2W4pSM6TPGzIVm0SRDIP4DUT9kguAHhftBMEwSyAbwzYbzVmSJ4yZKt2CQIA8iUAp6u1Q/JgEARxF4nvVmu/BXnPlHGT91NWQXI/gIeqtUPy7Zj9ewH8Wq39FuNnkp+ZMlbzBJE8QPI+AFUNPkn+SPKL8h0kC1B3WEV8bNJYPa4U30Ly+WoMkJwlOROzfxrAP9XEaEG+NWmsnldrd5N8oQr9eZKvxO0kuUjyULUxWoxjJo3V+34IyQDAvY7jvA/gGQBXV2hiAcDbQRB8F3eQ5AGSHzqOswvAjQB2ANgEYBLAOgAdADoBlN5KLAAokswBmANwHsA0gFMAjgL4CMBMEARFlX4TKBQKhUKhUCgUCoVCoVAoFAqFQtFM2OJAz/M2AJgCsBHAOIBuVH6bvghgHkAGwDkApwGcDIJgvhbBPc/rArAZwBYU+9oHYBTFvqYApFDs6ziKfZ0jeYrkqSAIFmsRr1VIAbgawA0ArgOwE8WE9FZhM0MyS/IcgD8AHAPwJYCvgiCYNRjb87wEgG0ArgVwHYrJ2IbiF0RfX4skF0hmUOzrMQBfA/gsCIKTBmO3HKMA7gBwN4BdALpqHG8JwI8A3gXwThAEv9QqkOd5WwHcCuBOANejvn39BsD7AN4NgmC6VrGajQ4U3/EHAMzW+d9+HsCrAK40/Up5nrcewH4U3/mzde7rAoD/APwXBMGZ+A5aB8/z9pF8k+SZBhsv5xTJZ0n2m+6P53m9JJ8ieaLBfS3nLMm3SO6tqq8KhUKhUCgUCkVz8z9YD0RfvjgxIQAAAABJRU5ErkJggg==" 
                alt="Betrouwbaar en valide" 
                className="mx-auto mb-2"
              />
              <p className="font-medium">Betrouwbaar en valide</p>
              <p className="text-gray-600">Gegroepeerde punten, juist doel</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Validiteit Sectie */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Typen Validiteit</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Inhoudsvaliditeit (Content)</h3>
              <p className="text-gray-700">
                De vragen dekken het onderwerp volledig. Alle belangrijke aspecten van het construct 
                worden gemeten door de items in de test.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Constructvaliditeit</h3>
              <p className="text-gray-700">
                De test meet het abstracte begrip goed. Het meetinstrument is een goede 
                operationele definitie van het theoretische construct.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Criteriumvaliditeit</h3>
              <p className="text-gray-700">
                Hoe goed voorspelt de test een externe uitkomst? De mate waarin de test 
                gerelateerd is aan andere relevante maatstaven.
              </p>
            </div>
          </div>
        </section>

        {/* Betrouwbaarheid Sectie */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Betrouwbaarheid</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Consistentie</h3>
              <p className="text-gray-700">
                Bij herhaalde metingen onder dezelfde omstandigheden worden vergelijkbare 
                resultaten gevonden.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-medium mb-2">Cronbach's Alpha</h3>
              <p className="text-gray-700">
                Een maat voor interne consistentie. Een waarde ≥ 0.70 wordt vaak als 
                acceptabel beschouwd.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Voorbeelden:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>"Een motivatievragenlijst wordt gebruikt als IQ-test" → niet valide</li>
              <li>"Elke keer dezelfde score bij herhaalde afname" → wel betrouwbaar</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => navigate('/module3/interactie')}
          className="btn btn-primary"
        >
          Start interactie
        </button>
      </div>
    </div>
  );
};

export default Uitleg; 