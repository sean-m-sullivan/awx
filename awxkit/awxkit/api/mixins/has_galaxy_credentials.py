from contextlib import suppress

import awxkit.exceptions as exc


class HasGalaxyCredentials(object):
    def add_galaxy_credential(self, credential):
        with suppress(exc.NoContent):
            self.related['galaxy_credentials'].post(dict(id=galaxy_credential.id))

    def remove_galaxy_credential(self, credential):
        with suppress(exc.NoContent):
            self.related['galaxy_credentials'].post(dict(id=galaxy_credential.id, disassociate=galaxy_credential.id))

    def remove_all_galaxy_credentials(self):
        for ig in self.related.galaxy_credentials.get().results:
            self.remove_galaxy_credential(ig)
